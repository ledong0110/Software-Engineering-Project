package utils

import "strings"


func add(a int, b int) int {
	return a+b
}

func equal(a string, b string) bool{
	return strings.Compare(a, b) == 0
	
}

var Helpers = map[string]interface{}{
	"add": add,
	"equalString": equal,
	
}
