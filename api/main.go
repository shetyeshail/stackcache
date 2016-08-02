package main

import "fmt"

func main() {
	// Get the environment configuration or die trying.
	config := GetConfig()
	fmt.Println("Hello World!\n\n" + config.String() + "\n")
}
