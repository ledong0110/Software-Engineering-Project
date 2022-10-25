package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var officerController controllers.OfficerController= controllers.InitializeOfficerController()

func BackofficerRouter(backofficer fiber.Router) {
	backofficer.Get("/chat-app", officerController.ChatInterface)
	backofficer.Get("/task-management")
	backofficer.Get("/task-management/assign")
	backofficer.Get("/mcps")
	backofficer.Get("/vehicles")
	backofficer.Get("/", officerController.Home)
}