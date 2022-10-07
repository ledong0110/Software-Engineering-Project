package middlewares

import (
	_"log"

	"github.com/gofiber/fiber/v2"

	model "chat_module/app/models"
	store "chat_module/config/session"
)

var User = model.User

func IsAuthenticated(c *fiber.Ctx) error {
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