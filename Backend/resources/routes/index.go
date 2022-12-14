package routes

import (
	middleware "chat_module/app/middlewares"
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
)

func Route(app *fiber.App) {
	
	message := app.Group("/chat-app")
	// message.Use(jwtware.New(jwtware.Config{
	// 	SigningKey: []byte(os.Getenv("ACCESS_TOKEN_SECRET")),
	// }))
	MessageRouter(message)

	backofficer := app.Group("/backofficer")
	backofficer.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("ACCESS_TOKEN_SECRET")),
	}))
	BackofficerRouter(backofficer)

	employee := app.Group("/employee", middleware.IsEmployee)
	employee.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("ACCESS_TOKEN_SECRET")),
	}))
	EmployeeRouter(employee)

	task := app.Group("/task")
	task.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(os.Getenv("ACCESS_TOKEN_SECRET")),
	}))
	TaskRouter(task)

	home := app.Group("/")
	HomeRouter(home)
}
