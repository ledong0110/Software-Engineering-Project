package session

import (
	"github.com/gofiber/fiber/v2/middleware/session"
)

var Store *session.Store 

func InitializeSession() {
	Store = session.New()
}