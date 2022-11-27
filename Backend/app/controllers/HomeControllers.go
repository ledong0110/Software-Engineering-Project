package controllers

import (
	// "context"
	// "time"
	// "encoding/json"
	"log"

	// "github.com/jinzhu/copier"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	// "go.mongodb.org/mongo-driver/mongo/options"
	
	// _"go.mongodb.org/mongo-driver/bson/primitive"

	utils "chat_module/resources/utility"
	model "chat_module/app/models"
	store "chat_module/config/session"
)


var User = model.User

type HomeController struct {
	Home func(*fiber.Ctx) error
	InsertPage func(*fiber.Ctx) error
	Insert func(*fiber.Ctx) error
	UserList func(*fiber.Ctx) error
	ShowLogin func(*fiber.Ctx) error
	Login func(*fiber.Ctx) error
	Logout func(*fiber.Ctx) error
	Map func(*fiber.Ctx) error
	EmptyPage func(*fiber.Ctx) error
}

func InitializeHomeController() HomeController {
	var homeController = HomeController{}

	homeController.Home = func (c *fiber.Ctx) error {
		return c.Redirect("/login")
	}

	homeController.InsertPage = func (c *fiber.Ctx) error {
		return c.Render("user/insert", fiber.Map{})
	}

	homeController.Insert = func (c *fiber.Ctx) error {
		payload := model.UserFormat{}
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
		payload.Password, _ = utils.CreatePassword(payload.Password)
		payload.Online = "N"
		_, err := User.InsertOne(payload)
		if err != nil {
			log.Println(err)
			return c.SendString("Failed Insert :((( Pleas try again")
		}
		return c.SendString("Successfully Insert new User")
	}

	homeController.UserList = func (c *fiber.Ctx) error {
		filter := bson.D{}
		userDetails, _  := User.Find(filter)
		return c.Render("user/list", fiber.Map{"users": userDetails})
	}
	
	homeController.ShowLogin = func (c*fiber.Ctx) error {
		return c.Render("login/login", fiber.Map{})
	}

	homeController.Login = func (c*fiber.Ctx) error {
		payload := struct {
			Username  string `json:"username"`
			Password string  `json:"password"`
		}{}
	
		if err := c.BodyParser(&payload); err != nil {
			return err
		}
		// log.Println(string(acc))
		// opts := options.FindOne().SetProjection(bson.M{
		// 	"username": 1,
		// 	"password": 1,
		// })
		userDetail, err := User.FindOne(bson.M{"username": payload.Username})
		if err != nil {
			log.Println(err)
			return c.SendString("This user does not exist in our system :(")
		}
		if utils.ComparePasswords(payload.Password, userDetail.Password){
			log.Println("Successfully authentication")
		} else {
			log.Println("Wrong Password")
			return c.SendString("Oops ! Wrong password, Try again :D ?")
		}
		sess, err := store.Store.Get(c)
		if err != nil {
			log.Println(err)
			return err
		}
		sess.Set("id", userDetail.ID.Hex())
		sess.Set("user_name", userDetail.Name)
		sess.Set("picture", userDetail.Picture)
		sess.Set("role", userDetail.Role)
		sess.Save()
		return c.Redirect("/")
	}

	homeController.Logout = func (c *fiber.Ctx) error {
		sess, err := store.Store.Get(c)
		if err != nil {
			log.Println(err)
			return err
		}
		if err := sess.Destroy(); err != nil {
            panic(err)
        }
		return c.Redirect("/")

	}
	
	homeController.Map = func(c *fiber.Ctx) error {
		return c.Render("map", fiber.Map{})
	}
	homeController.EmptyPage = func (c *fiber.Ctx) error {
		c.Status(404)
		return c.Render("alert", fiber.Map{"content":"We cannot find your page :("})
	}

	return homeController
}
