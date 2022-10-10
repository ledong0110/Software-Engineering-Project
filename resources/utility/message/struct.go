package message_handler

import (
	"github.com/gofiber/websocket/v2"
)

// Client is a middleman between the websocket connection and the hub.
type Client struct {
	hub                 *Hub
	webSocketConnection *websocket.Conn
	send                chan SocketEventStruct
	userID              string
}

// SocketEventStruct struct of socket events
type SocketEventStruct struct {
	EventName    string      `json:"eventName"`
	EventPayload interface{} `json:"eventPayload"`
}

type UserDetailsResponsePayloadStruct struct {
	Username string `json:"username"`
	UserID   string `json:"userID"`
	Online   string `json:"online"`
}

// ConversationStruct is a universal struct for mapping the conversations
type ConversationStruct struct {
	ID         string `json:"id" bson:"_id,omitempty"`
	Message    string `json:"message"`
	ToUserID   string `json:"toUserID"`
	FromUserID string `json:"fromUserID"`
}