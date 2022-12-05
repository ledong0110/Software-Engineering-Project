package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
	_ "go.mongodb.org/mongo-driver/bson/primitive"

	"chat_module/resources/utility/goose"
)

// MessagePayloadStruct is a struct used for message Payload
type TaskStruct struct {
	ID 			int `json:"id" bson:"_id, omitempty"`
	Name		string `json:"title" bson:"title"`
	Type 		string `json:"type" bson:"type, omitempty"`
	Time		time.Time `json:"time" bson"time"`
	Number    	int `json:"number" bson:"number"`
	MCP			[]int 	`json:"MCP" bson:"MCP"`
	Description string `json:"description" bson:"description"`
	Worker		[]primitive.ObjectID `json:"worker" bson:"worker"`
	Vehicle 	int			`json:"vehicle" bson:"vehicle"`
	State		int 		`json:"state" bson:"state" default: 0`
}

var Task = goose.New[TaskStruct]("task")