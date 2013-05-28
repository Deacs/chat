// http://net.tutsplus.com/tutorials/javascript-ajax/real-time-chat-with-nodejs-socket-io-and-expressjs/

var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
	res.render("page");
});

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
	console.log('Successful connection');
	socket.emit('message', { message: 'Welcome to the chat' });
	socket.on('send', function(data) {
		io.sockets.emit('message', data);
	});
});

console.log("Listening on port " + port);