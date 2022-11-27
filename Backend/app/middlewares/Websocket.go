package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
)

func VerifyWebSocket(c *fiber.Ctx) error {
	if websocket.IsWebSocketUpgrade(c) {
		c.Locals("allowed", true)
		return c.Next()
	}
	return fiber.ErrUpgradeRequired
}