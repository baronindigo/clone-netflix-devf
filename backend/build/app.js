'use strict';

var http = require('http');
var hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(function (req, res) {
    res.statusCode = 200; // codigo http cuando un request sale bien
    res.setHeader('Content-Type', 'text/plain');
    res.end('HOLA');
});

server.listen(port, hostname, function () {
    console.log('Server corriendo en http://' + hostname + ':' + port);
});