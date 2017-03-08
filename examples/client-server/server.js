// JSLintError: "Unused variable \"req\"."
// JSLintError: "This function needs a \"use strict\" pragma." (createServer)
// JSLintError: "Bad method name \"readFileSync\""
var http = require("http");
var client = require("fs").readFileSync(__dirname + "/client.js");

http
    .createServer(function (req, res) {
        res.writeHeader(200, {
            "content-type": "text/javascript; utf-8"
        });
        res.end(client);
    })
    .listen(3456);
