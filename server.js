var express = require("express")
var port = 4500

var server = express.server()

server.listen(port, function listener() {
    console.log(`server listener on www.localhost:${port}`)
})