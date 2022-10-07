package session

import (
	"os"

	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/mongodb"
)

var Store *session.Store 

func InitializeSession() {
	storage := mongodb.New(mongodb.Config{
		ConnectionURI: os.Getenv("DB_URL"),
		Database:   	 "session",
		Collection: 	 "session_storage",
		Reset:      	 false,
	})
	Store = session.New(session.Config{
		Storage: storage,
	})
}