package controllers

import (
	// "context"
	// "time"
	"encoding/json"
	// "log"

	// "github.com/jinzhu/copier"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"

	// _"go.mongodb.org/mongo-driver/bson/primitive"

	// db "chat_module/config/db"
	model "chat_module/app/models"
)


var User = model.User

type HomeController struct { 
	Home func(*fiber.Ctx) error
	Blog func(*fiber.Ctx) error
	UserSave func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	Login func(*fiber.Ctx) error
}

func InitializeHomeController() HomeController {
	var homeController = HomeController{}

	homeController.Home = func(c *fiber.Ctx) error {
        return c.Render("login/login", fiber.Map{})
	}

	homeController.Blog = func (c *fiber.Ctx) error {
		return c.SendString("Day la blog")
	}

	homeController.UserList = func (c *fiber.Ctx) error {
		filter := bson.D{}
		userDetails, _  := User.Find(filter)
		return c.Render("user/list", fiber.Map{"users": userDetails})
	}
	
	homeController.Login = func (c*fiber.Ctx) error {
		payload := struct {
			Username  string `json:"username"`
			Password string  `json:"password"`
		}{}
	
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
		acc, _ := json.Marshal(payload)
		// log.Println(string(acc))
		return c.SendString(string(acc))
	}

	return homeController
}
