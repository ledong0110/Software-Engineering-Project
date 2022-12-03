package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
	"chat_module/resources/utility/goose"
)


type UserFormat struct {
	ID 			primitive.ObjectID	`bson:"_id,omitempty"`
	Name		string				`bson:"name,omitempty"`
	Picture		string				`bson:"picture,omitempty"`
	Username	string				`bson:"username,omitempty"`
	Password	string				`bson:"password,omitempty"`
	Role		int32				`bson:"role,omitempty"`
	Online 		string				`bson:"online,omitempty"`
	RefreshToken string 			`bson:"refreshToken, omitempty"`
}

var User = goose.New[UserFormat]("user")