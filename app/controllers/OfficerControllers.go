package controllers

import (
	"github.com/gofiber/fiber/v2"

	store "chat_module/config/session"
)



type OfficerController struct { 
	Home func(*fiber.Ctx) error
	ChatInterface func(*fiber.Ctx) error
}

func InitializeOfficerController() OfficerController {
	var officerController = OfficerController{}

	officerController.Home = func(c *fiber.Ctx) error {
		sess, _ := store.Store.Get(c)

        return c.Render("backofficer/site", fiber.Map{
			"user_name": sess.Get("user_name"),
			"picture" : sess.Get("picture"),
		})
	}

	officerController.ChatInterface = func(c *fiber.Ctx) error {
		return c.Render("messenger/chat", fiber.Map{})
	}

	return officerController
}
