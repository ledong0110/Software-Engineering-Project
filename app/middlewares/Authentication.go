package middlewares

import (
	_ "log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	model "chat_module/app/models"
	store "chat_module/config/session"
)

var User = model.User

func IsAuthenticated(c* fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("id") == nil) {
		return c.Redirect("/login")
	}
	id := sess.Get("id")
	docId, _ := primitive.ObjectIDFromHex(id.(string))
	user, _ := User.FindOne(bson.M{"_id": docId})
	if user.Online != "Y" {
		User.UpdateOne(bson.M{"_id": docId}, bson.M{"$set": bson.M{"online": "Y"}})
	}

	return c.Next()
}

func SwithcRoute(c *fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("id") == nil) {
		return c.Next()
	}
	var role = sess.Get("role")
	if (role == int32(0)) {
		return c.Redirect("/backofficer")
	} else {
		return c.Redirect("/employee")
	}
}

func IsBackOfficer(c *fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("id") == nil) {
		return c.Redirect("/")
	}
	if (sess.Get("role") != int32(0)) {
		return c.Render("alert", fiber.Map{"content": "You are not permitted to access this site"})
	}
	return c.Next()
}

func IsEmployee(c *fiber.Ctx) error {
	sess, _ := store.Store.Get(c)
	if (sess.Get("id") == nil) {
		return c.Redirect("/")
	}
	if (sess.Get("role") != int32(1)) {
		return c.Render("alert", fiber.Map{"content": "You are not permitted to access this site"})
	}
	return c.Next()
}