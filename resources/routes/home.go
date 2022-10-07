package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var homeController controllers.HomeController= controllers.InitializeHomeController()

func HomeRouter(home fiber.Router) {
	home.Get("/blog", homeController.Blog)
	home.Get("/users", homeController.UserList)
	home.Post("/login", homeController.Login)
	home.Get("/", homeController.Home)
}