$(document).ready(function() {

	var messages 	= [];
	var socket 		= io.connect('http://localhost:3700');
	var $field 		= $("#field");
	var $sendButton = $("#send");
	var $content 	= $("#content");
	var $name 		= $("#name");

	socket.on('message', function(data) {
		if (data.message) {
			messages.push(data);
			var html 		= '',
				msgLength 	= messages.length;
			for (var i = 0; i < msgLength; i++) {
				html += '<div><b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '</div>';
			}

			$content.html(html);
			// $('<div></div>').appendTo($content).hide().append(html).fadeIn('slow');

			$content.scrollTop($content[0].scrollHeight);
		} else {
			console.log("There is a problem:", data);
		}
	});

	$field.keyup(function(e) {
		if (e.keyCode == 13) {
			sendMessage();
		}
	});

	$sendButton.on('click', function() {
		sendMessage();
	});

	var sendMessage = function() {
		if (name.value == "") {
			alert("Please type your name!");
		} else {
			var text = $field.val();
			socket.emit('send', { message: text, username: $name.val() });
			$field.val('');
		}
	};
});