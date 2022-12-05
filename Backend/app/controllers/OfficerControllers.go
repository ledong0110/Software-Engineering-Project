package controllers

import (
	// "log"
	"log"
	_ "log"

	// model "chat_module/app/models"
	store "chat_module/config/session"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
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
		// return c.Render("chat-test", fiber.Map{})
		log.Println("Access Message App")
		id := c.Query("id")
		type userPrint struct{
			Id string `json:"id"`
			Name string `json:"name"`
			Picture string `json:"picture"`
			Online string `json:"online"`
		}
		type Combine struct {
			User		userPrint		`json:"user"`
			Message 	string	`json:"message"`
		}
		var userAndMessage []Combine
		opt := options.Find().SetProjection(bson.M{
			"username": 0,
			"password": 0,
		})
		optMess := options.Find()
		optMess.SetSort(bson.D{{"$natural", -1}})
		optMess.SetLimit(1)
		idCurrUser, _ := primitive.ObjectIDFromHex(id)
		users, _ := User.Find(bson.M{"_id": bson.M{"$ne": idCurrUser}}, opt)
		for _, user := range users {
			filter := bson.M{
				"$or": []bson.M{
					{
						"$and": []bson.M{
							{
								"toUserID": id,
							},
							{
								"fromUserID": user.ID.Hex(),
							},
						},
					},
					{
						"$and": []bson.M{
							{
								"toUserID": user.ID.Hex(),
							},
							{
								"fromUserID": id,
							},
						},
					},
				},
			}
			message, _ := Message.Find(filter, optMess)
			
			
			if (len(message)>0) {	
				userAndMessage = append(userAndMessage, Combine{userPrint{user.ID.Hex(), user.Name, user.Picture, user.Online}, message[0].Message})
			} else {
				userAndMessage = append(userAndMessage, Combine{userPrint{user.ID.Hex(), user.Name, user.Picture, user.Online}, ""})
			}
		}
		return c.JSON(fiber.Map{"user_list": userAndMessage})
	}

	return officerController
}
