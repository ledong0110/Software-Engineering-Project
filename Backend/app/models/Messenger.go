package models

import (
	_"go.mongodb.org/mongo-driver/bson/primitive"

	"chat_module/resources/utility/goose"

)

// MessagePayloadStruct is a struct used for message Payload
type MessageStruct struct {
	FromUserID string `json:"fromUserID" bson:"fromUserID"`
	ToUserID   string `json:"toUserID" bson:"toUserID"`
	Message    string `json:"message" bson:"message"`
}

var Message = goose.New[MessageStruct]("message")