package controllers

import (
	// "context"
	// "errors"
	// "os"
	// "time"

	"encoding/json"
	// "log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"go.mongodb.org/mongo-driver/bson"

	// "go.mongodb.org/mongo-driver/bson/primitive"

	model "chat_module/app/models"
	store "chat_module/config/session"
	message_handler "chat_module/resources/utility/message"
)


var Message = model.Message
var Hub = message_handler.NewHub()
type MessageController struct {
	Hub 	*message_handler.Hub
	GetCurrentUserID func(*fiber.Ctx) error
	CreateNewSocketUser func(*websocket.Conn)
	GetConversation func(*fiber.Ctx) error
}



func InitializeMessageController() MessageController {
	messageController := MessageController{}
	// messageController.Hub = message_handler.NewHub()
	// go messageController.Hub.Run()
	messageController.GetCurrentUserID = func (c *fiber.Ctx) error {
		sess, _ := store.Store.Get(c)
		c.Locals("id", sess.Get("id"))
		return c.Next()
	}
	messageController.CreateNewSocketUser = func (c *websocket.Conn) {

		message_handler.CreateNewSocketUser(Hub, c, c.Locals("id").(string))
	}

	messageController.GetConversation = func (c *fiber.Ctx) error {
		sess, _ := store.Store.Get(c)
		fromUserID := sess.Get("id")
		toUserID := c.Params("ToUser")
		filter := bson.M{
			"$or": []bson.M{
				{
					"$and": []bson.M{
						{
							"toUserID": toUserID,
						},
						{
							"fromUserID": fromUserID,
						},
					},
				},
				{
					"$and": []bson.M{
						{
							"toUserID": fromUserID,
						},
						{
							"fromUserID": toUserID,
						},
					},
				},
			},
		}

		conversations, _ := Message.Find(filter)
		convertJson, _ := json.Marshal(conversations)
		jsonConversation := string(convertJson)
		return c.SendString(jsonConversation)
	}

	return messageController
}





