package controllers

import (
	// "context"
	// "errors"
	// "os"
	// "time"

	// "encoding/json"
	// "log"

	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"

	// "go.mongodb.org/mongo-driver/bson/primitive"

	model "chat_module/app/models"
	
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
		refreshToken := c.Cookies("jwt", "none")
		if refreshToken == "none" {
			return c.SendStatus(401)
		}
		refreshClaims := jwt.StandardClaims{}
		jwt.ParseWithClaims(refreshToken, &refreshClaims,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
			},
		)
		userID := refreshClaims.Issuer
		log.Println("Hello")
		c.Locals("id", userID)
		return c.Next()
	}
	messageController.CreateNewSocketUser = func (c *websocket.Conn) {
		log.Println("New user enter")
		message_handler.CreateNewSocketUser(Hub, c, c.Locals("id").(string))
	}

	messageController.GetConversation = func (c *fiber.Ctx) error {
		refreshToken := c.Cookies("jwt", "none")
		if refreshToken == "none" {
			return c.SendStatus(401)
		}
		refreshClaims := jwt.StandardClaims{}
		jwt.ParseWithClaims(refreshToken, &refreshClaims,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
			},
		)
		
		fromUserID := refreshClaims.Issuer
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
		
		
		return c.JSON(fiber.Map{"conversation": conversations})
	}

	return messageController
}





