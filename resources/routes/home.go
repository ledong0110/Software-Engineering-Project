package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
	middleware "chat_module/app/middlewares"
)
var homeController controllers.HomeController= controllers.InitializeHomeController()

func HomeRouter(home fiber.Router) {
	home.Get("/users", homeController.UserList)
	home.Get("/users/insert", homeController.InsertPage)
	home.Post("/users/insert", homeController.Insert)
	home.Get("/login", homeController.ShowLogin)
	home.Get("/logout", homeController.Logout)
	home.Post("/login",  middleware.IsAuthenticated, homeController.Login)
	home.Get("/", middleware.IsAuthenticated, homeController.Home)
	home.Get("*", homeController.EmptyPage)
}