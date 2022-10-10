package routes

import (
	middleware "chat_module/app/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Route(app *fiber.App) {
	app.Use("/chat-app/ws", middleware.VerifyWebSocket)
	message := app.Group("/chat-app", middleware.IsAuthenticated)
	MessageRouter(message)

	backofficer := app.Group("/backofficer", middleware.IsBackOfficer)
	BackofficerRouter(backofficer)
	employee := app.Group("/employee", middleware.IsEmployee)
	EmployeeRouter(employee)
	home := app.Group("/")
	HomeRouter(home)
}
