package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"

	controllers "chat_module/app/controllers"
)
var messageController controllers.MessageController= controllers.InitializeMessageController()

func MessageRouter(message fiber.Router) {
	message.Get("/ws/register", messageController.GetCurrentUserID ,websocket.New(messageController.CreateNewSocketUser))
	message.Post("/GetConversation/:ToUser", messageController.GetConversation)
}