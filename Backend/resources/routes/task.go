package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var taskRouter controllers.TaskController= controllers.InitializeTaskController()

func TaskRouter(task fiber.Router) {
	// task.Get("/get-all-task")
	// task.Get("/get-today-task")
	// task.Get("/mcps")
	// task.Get("/vehicles")
}