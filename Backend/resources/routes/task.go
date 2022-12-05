package routes

import (
	"github.com/gofiber/fiber/v2"

	controllers "chat_module/app/controllers"
)
var taskController controllers.TaskController= controllers.InitializeTaskController()

func TaskRouter(task fiber.Router) {
	task.Post("/insert-task", taskController.InsertTask)
	task.Post("/edit-task", taskController.EditTask)
	task.Post("/get-one-task", taskController.GetOneTask)
	task.Post("/get-all-task", taskController.GetAllTask)
	// task.Get("/mcps")
	// task.Get("/vehicles")
}