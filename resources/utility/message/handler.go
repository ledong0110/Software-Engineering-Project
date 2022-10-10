package message_handler

import (
	"bytes"
	"encoding/json"
	"log"
	"time"

	"github.com/gofiber/websocket/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"

	model "chat_module/app/models"
)

var User = model.User
var Message = model.Message

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

func unRegisterAndCloseConnection(c *Client) {
	c.hub.unregister <- c
	c.webSocketConnection.Close()
}

func setSocketPayloadReadConfig(c *Client) {
	c.webSocketConnection.SetReadLimit(maxMessageSize)
	c.webSocketConnection.SetReadDeadline(time.Now().Add(pongWait))
	c.webSocketConnection.SetPongHandler(func(string) error { c.webSocketConnection.SetReadDeadline(time.Now().Add(pongWait)); return nil })
}

func handleSocketPayloadEvents(client *Client, socketEventPayload SocketEventStruct) {
	type chatlistResponseStruct struct {
		Type     string      `json:"type"`
		Chatlist interface{} `json:"chatlist"`
	}
	switch socketEventPayload.EventName {

	case "join":
		userID := (socketEventPayload.EventPayload).(string)
		docID, _ := primitive.ObjectIDFromHex(userID)
		opts := options.FindOne().SetProjection(bson.M{
			"username": 1,
			"online": 1,
		})
		userDetails, err := User.FindOne(bson.M{"_id":docID}, opts)
		if err != nil {
			log.Println("An invalid user with userID " + userID + " tried to connect to Chat Server.")
		} else {
			if userDetails.Online == "N" {
				log.Println("A logged out user with userID " + userID + " tried to connect to Chat Server.")
			} else {
				newUserOnlinePayload := SocketEventStruct{
					EventName: "chatlist-response",
					EventPayload: chatlistResponseStruct{
						Type: "new-user-joined",
						Chatlist: userDetails,
					},
				}
				BroadcastSocketEventToAllClientExceptMe(client.hub, newUserOnlinePayload, userDetails.ID.Hex())

				optsFindAll := options.Find().SetProjection(bson.M{
					"username": 1,
					"online": 1,
				})
				onlineUserList, _ := User.Find(bson.M{
					"online": "Y", 
					"_id": bson.M{
						"$ne": userDetails.ID,
					},
				}, optsFindAll)
				allOnlineUsersPayload := SocketEventStruct{
					EventName: "chatlist-response",
					EventPayload: chatlistResponseStruct{
						Type:     "my-chat-list",
						Chatlist: onlineUserList,
					},
				}
				EmitToSpecificClient(client.hub, allOnlineUsersPayload, userDetails.ID.Hex())
			}
		}
	case "disconnect":
		if socketEventPayload.EventPayload != nil {
			userID := (socketEventPayload.EventPayload).(string)
			docID, _ := primitive.ObjectIDFromHex(userID)
			opts := options.FindOne().SetProjection(bson.M{
				"username": 1,
				"online": 1,
			})
			userDetails, _ := User.FindOne(bson.M{"_id": docID}, opts)
			// Update user status (offline)
			User.UpdateOne(bson.M{"_id": userDetails.ID}, bson.M{"$set": bson.M{"online": "N"}} )
			
			BroadcastSocketEventToAllClient(client.hub, SocketEventStruct{
				EventName: "chatlist-response",
				EventPayload: chatlistResponseStruct{
					Type: "user-disconnected",
					Chatlist: userDetails,
				},
			})
		}
	case "message":
		message := (socketEventPayload.EventPayload.(map[string]interface{})["message"]).(string)
		fromUserID := (socketEventPayload.EventPayload.(map[string]interface{})["fromUserID"]).(string)
		toUserID := (socketEventPayload.EventPayload.(map[string]interface{})["toUserID"]).(string)
		
		if message != "" && fromUserID != "" && toUserID != "" {

			messagePacket := model.MessageStruct{
				FromUserID: fromUserID,
				Message:    message,
				ToUserID:   toUserID,
			}
			Message.InsertOne(messagePacket)
			
			allOnlineUsersPayload := SocketEventStruct{
				EventName:    "message-response",
				EventPayload: messagePacket,
			}
			EmitToSpecificClient(client.hub, allOnlineUsersPayload, toUserID)

		}
	}
}
//*************************VERSION 1***************************
// func (c *Client) readPump() {
// 	// var socketEventPayload SocketEventStruct

// 	// Unregistering the client and closing the connection
// 	defer unRegisterAndCloseConnection(c)

// 	// Setting up the Payload configuration
// 	setSocketPayloadReadConfig(c)

// 	for {
// 		// ReadMessage is a helper method for getting a reader using NextReader and reading from that reader to a buffer.
// 		_, payload, _ := c.webSocketConnection.ReadMessage()

// 		// decoder := json.NewDecoder(bytes.NewReader(payload))
// 		// decoderErr := decoder.Decode(&socketEventPayload)

// 		// if decoderErr != nil {
// 		// 	log.Printf("error: %v", decoderErr)
// 		// 	break
// 		// }

// 		// if err != nil {
// 		// 	if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
// 		// 		log.Printf("error ===: %v", err)
// 		// 	}
// 		// 	break
// 		// }
// 		log.Println(payload)
// 		//  Getting the proper Payload to send the client
// 		//handleSocketPayloadEvents(c, socketEventPayload)
// 	}
// }
//********************************************
//*****************VERSION 2**********************************************
func (c *Client) readPump() {
	var socketEventPayload SocketEventStruct
	defer unRegisterAndCloseConnection(c)
	
	// Register the client
	
	

	for {
		// ReadMessage is a helper method for getting a reader using NextReader and reading from that reader to a buffer.
		_, payload, err := c.webSocketConnection.ReadMessage()
		
		decoder := json.NewDecoder(bytes.NewReader(payload))
		decoderErr := decoder.Decode(&socketEventPayload)

		if decoderErr != nil {
			log.Printf("error: %v", decoderErr)
			break
		}

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error ===: %v", err)
			}
			break
		}
		// log.Println(string(payload))
		//  Getting the proper Payload to send the client
		handleSocketPayloadEvents(c, socketEventPayload)
		// if messageType == websocket.TextMessage {
		// 	// Broadcast the received message
		// 	broadcast <- string(message)
		
	}
}



//******************************************************************
func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		// c.webSocketConnection.Close()
		
	}()
	for {
		select {
		case payload, ok := <-c.send:

			reqBodyBytes := new(bytes.Buffer)
			json.NewEncoder(reqBodyBytes).Encode(payload)
			finalPayload := reqBodyBytes.Bytes()
			if !ok {
				// 	c.webSocketConnection.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			
			c.webSocketConnection.SetWriteDeadline(time.Now().Add(writeWait))
			w, err := c.webSocketConnection.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}

			w.Write(finalPayload)

			n := len(c.send)
			for i := 0; i < n; i++ {
				json.NewEncoder(reqBodyBytes).Encode(<-c.send)
				w.Write(reqBodyBytes.Bytes())
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.webSocketConnection.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.webSocketConnection.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
//*************************VERSION 2****************************
// func (c *Client) writePump() {
// 	defer func() {
// 				c.webSocketConnection.Close()
// 			}()
	
// 	for {
// 			select {
// 			case payload, ok := <-c.send:
// 				// log.Println("Hello in write pump")
// 				reqBodyBytes := new(bytes.Buffer)
// 				json.NewEncoder(reqBodyBytes).Encode(payload)
// 				finalPayload := reqBodyBytes.Bytes()
// 				// log.Println(string(finalPayload))
// 				// c.webSocketConnection.SetWriteDeadline(time.Now().Add(writeWait))
// 				if !ok {
// 					c.webSocketConnection.WriteMessage(websocket.CloseMessage, []byte{})
// 					return
// 				}
	
// 				w, err := c.webSocketConnection.NextWriter(websocket.TextMessage)
// 				if err != nil {
// 					return
// 				}
	
// 				w.Write(finalPayload)
	
// 				n := len(c.send)
// 				for i := 0; i < n; i++ {
// 					json.NewEncoder(reqBodyBytes).Encode(<-c.send)
// 					w.Write(reqBodyBytes.Bytes())
// 				}
	
// 				if err := w.Close(); err != nil {
// 					return
// 				}
// 			}
// 		}
// }

//****************************************
func CreateNewSocketUser(hub *Hub, c *websocket.Conn, userId string) {
	client := &Client {
		hub: hub,
		webSocketConnection: c,
		send: make(chan SocketEventStruct),
		userID: userId,
	}
	
	go client.writePump()
	client.hub.register <- client
	
	client.readPump()

}

func HandleUserRegisterEvent(hub *Hub, client *Client) {
	hub.clients[client] = true
	
	handleSocketPayloadEvents(client, SocketEventStruct{
		EventName:    "join",
		EventPayload: client.userID,
	})
}

func HandleUserDisconnectEvent(hub *Hub, client *Client) {
	_, ok := hub.clients[client]
	if ok {
		delete(hub.clients, client)
		close(client.send)

		handleSocketPayloadEvents(client, SocketEventStruct{
			EventName:    "disconnect",
			EventPayload: client.userID,
		})
	}
}



func EmitToSpecificClient(hub *Hub, payload SocketEventStruct, userID string) {
	log.Println("Emitting to user")
	for client := range hub.clients {
		if client.userID == userID {
			select {
			case client.send <- payload:
			default:
				close(client.send)
				delete(hub.clients, client)
			}
		}
	}
}

func BroadcastSocketEventToAllClient(hub *Hub, payload SocketEventStruct) {
	for client := range hub.clients {
		select {
		case client.send <- payload:
		default:
			close(client.send)
			delete(hub.clients, client)
		}
	}
}

func BroadcastSocketEventToAllClientExceptMe(hub *Hub, payload SocketEventStruct, myUserID string) {
	for client := range hub.clients {
		if client.userID != myUserID {
			select {
			case client.send <- payload:
			default:
				close(client.send)
				delete(hub.clients, client)
			}
		}
	}
}