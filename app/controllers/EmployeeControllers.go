package controllers

import (
	_ "chat_module/config/db"

	"github.com/gofiber/fiber/v2"

	store "chat_module/config/session"
)



type EmployeeController struct { 
	Home func(*fiber.Ctx) error
	ChatInterface func(*fiber.Ctx) error
}

func InitializeEmployeeController() EmployeeController {
	var employeeController = EmployeeController{}

	employeeController.Home= func(c *fiber.Ctx) error {
		sess, _ := store.Store.Get(c)

        return c.Render("employee/site", fiber.Map{
			"user_name": sess.Get("user_name"),
			"picture" : sess.Get("picture"),
		})
	}

	employeeController.ChatInterface = func(c *fiber.Ctx) error {
		return c.Render("messenger/chat", fiber.Map{})
	}

	return employeeController
}
