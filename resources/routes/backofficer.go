package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var officerController controllers.OfficerController= controllers.InitializeOfficerController()

func BackofficerRouter(backofficer fiber.Router) {
	backofficer.Get("/", officerController.Home)
}