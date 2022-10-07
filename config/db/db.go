package config

import (
	"os"

	"chat_module/resources/utility/goose"
)

func Connect() {
	goose.Connect(os.Getenv("DB_URL"), os.Getenv("MONGO_DB"))
}