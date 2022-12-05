package controllers

import (
	// "context"
	"os"
	"time"
	// "encoding/json"
	"log"

	// "github.com/jinzhu/copier"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/mongo/options"

	// _"go.mongodb.org/mongo-driver/bson/primitive"
	model "chat_module/app/models"
	utils "chat_module/resources/utility"

	"github.com/golang-jwt/jwt/v4"
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
	TokenRefresh func(*fiber.Ctx) error
}

func InitializeHomeController() HomeController {
	var homeController = HomeController{}

	homeController.Home = func (c *fiber.Ctx) error {
		return c.SendFile("./public/build/index.html")
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
			return c.SendStatus(403)
		}
		log.Println(payload)
		// log.Println(string(acc))
		opts := options.FindOne().SetProjection(bson.M{
			
			"online": 0,
		})
		
		userDetail, err := User.FindOne(bson.M{"username": payload.Username}, opts)
		if err != nil {
			
			return c.SendStatus(403)
		}
		if utils.ComparePasswords(payload.Password, userDetail.Password){
			log.Println("Successfully authentication")
			userDetail.Password = ""
		} else {
			log.Println("Wrong Password")
			return c.SendStatus(403)
		}
		RefreshToken, err := utils.CreateRefreshToken(userDetail)
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		AccessToken, err := utils.CreateAccessToken((userDetail))
		if err != nil {
			return c.SendStatus(fiber.StatusInternalServerError)
		}
		
		User.UpdateOne(bson.M{"_id": userDetail.ID}, bson.M{"$set": bson.D{{"refreshToken", RefreshToken}}})
		cookie := fiber.Cookie{
			Name: "jwt", 
			Value: RefreshToken,
			HTTPOnly: true,
			Secure: true,
			SameSite: "None",
			MaxAge: 24*60*60*1000,
		}
		
		c.Cookie(&cookie)
		return c.JSON(fiber.Map{"user": fiber.Map{"id": userDetail.ID.Hex() ,"role": userDetail.Role, "picture": userDetail.Picture, "name": userDetail.Name}, "accessToken": AccessToken})
	}

	homeController.Logout = func (c *fiber.Ctx) error {
		refreshToken := c.Cookies("jwt", "none")
		if refreshToken == "none" {
			return c.SendStatus(204)
		}
		userDetail, err := User.FindOne(bson.M{"refreshToken": refreshToken})
		if err != nil {
			c.ClearCookie("jwt")
			return c.SendStatus(204)	
		}
		
		User.UpdateOne(bson.M{"_id": userDetail.ID}, bson.M{"$set": bson.D{{"refreshToken", ""}}})
		c.ClearCookie("jwt")
		return c.SendStatus(204)	
	}
	
	homeController.TokenRefresh = func (c *fiber.Ctx) error {
		refreshToken := c.Cookies("jwt", "none")
		if refreshToken == "none" {
			return c.SendStatus(401)
		}
		opts := options.FindOne().SetProjection(bson.M{
			"password": 0,	
			"online": 0,
		})
		userDetail, err := User.FindOne(bson.M{"refreshToken": refreshToken}, opts)
		if err != nil {
			return c.SendStatus(fiber.StatusForbidden)
		}
		
		
		refreshClaims := jwt.StandardClaims{}
		token, _ := jwt.ParseWithClaims(refreshToken, &refreshClaims,
			func(token *jwt.Token) (interface{}, error) {
				return []byte(os.Getenv("REFRESH_TOKEN_SECRET")), nil
			},
		)
		
		if token.Valid {
			if refreshClaims.ExpiresAt < time.Now().Unix() {
				c.ClearCookie("jwt")
				return c.SendStatus(fiber.StatusForbidden)
			}
		} else {
			c.ClearCookie(("jwt"))
			return c.SendStatus(fiber.StatusForbidden)
		}

		AccessToken, _ := utils.CreateAccessToken(userDetail)
		
		return c.JSON(fiber.Map{"user": fiber.Map{"id": userDetail.ID.Hex() ,"role": userDetail.Role, "picture": userDetail.Picture, "name": userDetail.Name}, "accessToken": AccessToken})
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
