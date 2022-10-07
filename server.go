package main

import (
    _"fmt"
    "log"
    _"net/http"
    "os"

    _"github.com/gorilla/mux"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "github.com/joho/godotenv"
    "github.com/gofiber/template/handlebars"

    db "chat_module/config/db"
    utils "chat_module/resources/utility"
    routes "chat_module/resources/routes"
)

func main() {
    // Load env variables
    godotenv.Load()
    // Connect database
    db.Connect()
    // View engine
    engine := handlebars.New("./resources/views", ".hbs")
    
    for key, element := range utils.Helpers {
        engine.AddFunc(key, element)
    }
    // engine.Reload(true)
    // Initialize server
    app := fiber.New(fiber.Config{
		Views: engine,
        ViewsLayout: "layouts/main",
	})
    app.Use(cors.New())
    app.Static("/", "./public")

    routes.Route(app)
    
    log.Fatal(app.Listen(":"+os.Getenv("PORT")))
    
}