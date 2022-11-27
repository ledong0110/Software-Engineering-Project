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
	home.Post("/logout",  middleware.IsAuthenticated, homeController.Logout)
	home.Get("/login", middleware.SwithcRoute, homeController.ShowLogin)
	home.Post("/login", homeController.Login)
	home.Get("/map", homeController.Map)
	home.Get("/", middleware.IsAuthenticated, homeController.Home)
	home.Get("*", homeController.EmptyPage)
}