package controllers

import (
	// "log"
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
		sess, _ := store.Store.Get(c)
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
		idCurrUser, _ := primitive.ObjectIDFromHex(sess.Get("id").(string))
		users, _ := User.Find(bson.M{"_id": bson.M{"$ne": idCurrUser}}, opt)
		currUser, _ := User.FindOne(bson.M{"_id": idCurrUser})
		for _, user := range users {
			filter := bson.M{
				"$or": []bson.M{
					{
						"$and": []bson.M{
							{
								"toUserID": sess.Get("id").(string),
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
								"fromUserID": sess.Get("id").(string),
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
		return c.Render("messenger/chat", fiber.Map{"currUser": userPrint{currUser.ID.Hex(), currUser.Name, currUser.Picture, currUser.Online},"user_and_message": userAndMessage})
	}

	return officerController
}
