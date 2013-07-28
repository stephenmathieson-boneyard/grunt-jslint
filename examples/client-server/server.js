
var http = require('http');
var client = require('fs').readFileSync(__dirname + '/client.js');

http
    .createServer(function (req, res) {
        res.writeHeader(200, {
            'content-type': 'text/javascript; utf-8'
        });
        res.end(client);
    })
    .listen(3456);
