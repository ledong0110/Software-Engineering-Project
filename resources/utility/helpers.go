package utils

func add(a int, b int) int {
	return a+b
}

var Helpers = map[string]interface{}{
	"add": add,
}
