package controllers

import (
	_ "chat_module/config/db"

	"github.com/gofiber/fiber/v2"
)

//var user = db.MongoDB.Collection("user")

type EmployeeController struct { 
	Home func(*fiber.Ctx) error
	Blog func(*fiber.Ctx) error
	UserSave func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
}

func InitializeEmployeeController() EmployeeController {
	var employeeController = EmployeeController{}

	employeeController.Home= func(c *fiber.Ctx) error {
        return c.Render("employee/site", fiber.Map{})
	}

	// employeeController.UserList = func (c *fiber.Ctx) error {
	// 	result, err := user.InsertOne()
	// }
	return employeeController
}
