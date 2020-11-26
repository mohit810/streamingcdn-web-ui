package main

import (
	"flag"
	"github.com/julienschmidt/httprouter"
	"net/http"
	"strconv"
)

func main() {
	port := flag.Int("port", 8000, "http server port")
	flag.Parse()
	r := httprouter.New()
	r.ServeFiles("/*filepath", http.Dir("public"))
	err := http.ListenAndServe(":"+strconv.Itoa(*port), r)
	if err != nil {
		panic(err)
	}
}
