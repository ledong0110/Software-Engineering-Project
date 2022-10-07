package routes

import (
	"github.com/gofiber/fiber/v2"
)

func Route(app *fiber.App) {
	backofficer := app.Group("/backofficer")
	BackofficerRouter(backofficer)
	employee := app.Group("/employee")
	EmployeeRouter(employee)
	home := app.Group("/")
	HomeRouter(home)
}
