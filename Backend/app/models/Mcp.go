package models

import (
	_ "go.mongodb.org/mongo-driver/bson/primitive"

	"chat_module/resources/utility/goose"
)

// MessagePayloadStruct is a struct used for message Payload
type McpStruct struct {
	ID 			int `json:"id" bson:"_id, omitempty"`
	Longtitude	float64 `json:"longtitude" bson:"longtitude"`
	Latitude	float64 `json:"latitude" bson:"latitude"`
	Status		int 		`json:"status" bson:"status" default: 0`
}

var Mcp = goose.New[McpStruct]("MCPs")