package main

import (
	_ "fmt"
	"log"
	_ "net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/handlebars"
	"github.com/joho/godotenv"

	db "chat_module/config/db"
	routes "chat_module/resources/routes"
	utils "chat_module/resources/utility"
    
)

func main() {
    // Run chat room
    
    // Load env variables
    godotenv.Load()
    // Connect database
    db.Connect()
    // Start store session
    
    // View engine
    engine := handlebars.New("./resources/views", ".hbs")
    for key, element := range utils.Helpers {
        engine.AddFunc(key, element)
    }
    engine.Reload(true)
    // Initialize server
    app := fiber.New(fiber.Config{
		Views: engine,
        ViewsLayout: "layouts/main",
	})
    app.Use(cors.New(cors.Config{
        AllowCredentials: true,
        AllowOrigins: "http://locahost:3000",
        AllowHeaders:  "Origin, Content-Type, Accept",  
    }))
    app.Static("/", "./public")
    
    routes.Route(app)
    
    log.Fatal(app.Listen(":"+os.Getenv("PORT")))
    
}