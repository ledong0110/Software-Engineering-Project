package models

import (
	_ "go.mongodb.org/mongo-driver/bson/primitive"

	"chat_module/resources/utility/goose"
)

// MessagePayloadStruct is a struct used for message Payload
type VehicleStruct struct {
	ID 			int 	`json:"id" bson:"_id, omitempty"`
	License		string `json:"license" bson:"license"`
	Name		string `json:"name" bson:"name"`
	Capacity	int 	`json:"capacity" bson:"capacity"`
	Mass		int `json:"mass" bson:"mass"`
	Fuel 		int 	`json:"fuel" bson:"fuel"`
	Type 		string 	`json:"type" bson:"loai"`
	Occupy		int		`json:"occupy" bson:"occupy, omitempty", default: 0`
}

var Vehicle = goose.New[VehicleStruct]("vehicle")