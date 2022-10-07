package routes

import (
	"github.com/gofiber/fiber/v2"
	middleware "chat_module/app/middlewares"
)

func Route(app *fiber.App) {
	backofficer := app.Group("/backofficer", middleware.IsBackOfficer)
	BackofficerRouter(backofficer)
	employee := app.Group("/employee", middleware.IsEmployee)
	EmployeeRouter(employee)
	home := app.Group("/")
	HomeRouter(home)
}
