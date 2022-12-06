package controllers

import (
	"chat_module/app/models"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

var Task = models.Task
var Mcp = models.Mcp
var Vehicle = models.Vehicle

type TaskController struct {
	InsertTask func (c *fiber.Ctx) error
	EditTask func (c *fiber.Ctx) error
	GetOneTask func (c *fiber.Ctx) error
	GetAllTask func (c *fiber.Ctx) error
	GetAllMCP func(c *fiber.Ctx) error
	GetEmployee func(c *fiber.Ctx) error
	GetAllVehicle func(c *fiber.Ctx) error
	AddEmployee func(c *fiber.Ctx) error
}

func InitializeTaskController() TaskController {
	taskController := TaskController{}
	taskController.InsertTask = func (c *fiber.Ctx) error {
		newTask := models.TaskStruct{}
		if err := c.BodyParser(&newTask); err != nil {
			return c.SendStatus(fiber.ErrBadRequest.Code)
		}
		log.Println(newTask )
		id, _ := Task.Count(bson.M{})
		newTask.ID = int(id)
		_, err := Task.InsertOne(newTask)
		if err != nil {
			return c.SendStatus(fiber.ErrBadRequest.Code)
		}
		return c.SendStatus(fiber.StatusAccepted)
	}
	
	taskController.EditTask = func (c *fiber.Ctx) error {
		editedTask := models.TaskStruct{}
		log.Println("yes")
		if err := c.BodyParser(&editedTask); err != nil {
			return c.SendStatus(fiber.ErrBadRequest.Code)

		}
		
		log.Println(editedTask)
		_, err := Task.ReplaceOne(bson.D{{"_id", editedTask.ID}}, editedTask)
		if err != nil {
			return c.SendStatus(fiber.ErrBadRequest.Code)
		}
		log.Println("Done")
		return c.SendStatus(fiber.StatusAccepted)
	}

	taskController.GetOneTask = func(c *fiber.Ctx) error {
		id := struct {
			ID int `json:"id"`
		} {}
		if err := c.BodyParser(&id); err != nil {
			log.Println("Error")
			return c.SendStatus(fiber.ErrBadRequest.Code)

		}
		task, _ := Task.FindOne(bson.M{"_id": id.ID})
		return c.JSON(task)

	}

	taskController.GetAllTask = func(c *fiber.Ctx) error {
		task, err := Task.Find(bson.M{})
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(task)

	}

	taskController.GetAllMCP = func(c *fiber.Ctx) error {
		
		mcps, err := Mcp.Find(bson.M{})
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(mcps)

	}

	taskController.GetEmployee = func (c *fiber.Ctx) error {
			role := struct {
				Role int `json:"type"`
			} {}
			if err := c.BodyParser(&role); err != nil {
				log.Println("Error")
				return c.SendStatus(fiber.ErrBadRequest.Code)
	
			}
			opts := options.Find().SetProjection(bson.M{
					"refreshToken": 0,
				})
			
			listEmployees, err := User.Find(bson.M{"role": role.Role}, opts)
			if err != nil {
				return c.SendStatus(fiber.StatusBadRequest)
			}
			return c.JSON(listEmployees)
	}

	taskController.GetAllVehicle = func (c *fiber.Ctx) error {
		vehicle, err := Vehicle.Find(bson.M{})
		if err != nil {
			return c.SendStatus(fiber.StatusBadRequest)
		}
		return c.JSON(vehicle)
	}

	taskController.AddEmployee = func (c *fiber.Ctx) error {
		worker := struct {
			ID		int 				`json:"id"`
			Worker []primitive.ObjectID `json:"worker" bson:"worker"`
		}{}
		if err := c.BodyParser(&worker); err != nil {
			log.Println("Error")
			return c.SendStatus(fiber.ErrBadRequest.Code)
		}
		Task.UpdateOne(bson.M{"_id": worker.ID}, bson.M{"$set": bson.D{{"worker", worker.Worker}}})
		return c.SendStatus(fiber.StatusAccepted)
	}
	return taskController
}