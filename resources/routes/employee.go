package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var employeeController controllers.EmployeeController= controllers.InitializeEmployeeController()

func EmployeeRouter(employee fiber.Router) {
	employee.Get("/", employeeController.Home)
	employee.Get("/chat-app", employeeController.ChatInterface)
}