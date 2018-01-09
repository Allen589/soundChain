const blockChain = require('./blockChain.js');
const Block = require('./Block.js');
var SC = require('node-soundcloud');


var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);
