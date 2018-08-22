const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req,res)=>{
    res.statusCode = 200; // codigo http cuando un request sale bien
    res.setHeader('Content-Type', 'text/plain');
    res.end('HOLA');

})

server.listen(port, hostname, () => {
    console.log('Server corriendo en http://'+hostname+':'+port);
})