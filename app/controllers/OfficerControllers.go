package controllers

import (
	_ "chat_module/config/db"

	"github.com/gofiber/fiber/v2"
)

//var user = db.MongoDB.Collection("user")

type OfficerController struct { 
	Home func(*fiber.Ctx) error
	Blog func(*fiber.Ctx) error
	UserSave func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
}

func InitializeOfficerController() OfficerController {
	var officerController = OfficerController{}

	officerController.Home = func(c *fiber.Ctx) error {
        return c.Render("backofficer/site", fiber.Map{})
	}

	// officerController.UserList = func (c *fiber.Ctx) error {
	// 	result, err := user.InsertOne()
	// }
	return officerController
}
