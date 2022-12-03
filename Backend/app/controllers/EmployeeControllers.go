package controllers

import (
	_ "chat_module/config/db"

	"github.com/gofiber/fiber/v2"

	
)



type EmployeeController struct { 
	Home func(*fiber.Ctx) error
	ChatInterface func(*fiber.Ctx) error
}

func InitializeEmployeeController() EmployeeController {
	var employeeController = EmployeeController{}

	employeeController.Home= func(c *fiber.Ctx) error {
		

        return c.Render("employee/site", fiber.Map{
			
		})
	}

	employeeController.ChatInterface = func(c *fiber.Ctx) error {
		return c.Render("messenger/chat", fiber.Map{})
	}

	return employeeController
}
