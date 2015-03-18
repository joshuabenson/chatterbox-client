// YOUR CODE HERE:
	/* var message = {
	  username: 'shawndrost',
	  text: 'trololo',
	  roomname: '4chan'
	};*/

var app =  {
init:function (argument) {
	// body...
},

send:function(message){
	return $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'https://api.parse.com/1/classes/chatterbox',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message');
  }
});
},
fetch: function(data){
	return $.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox/',
		type: 'GET',
		data: {order: "-createdAt"},
		contentType: 'application/json',
		success: function (data) {
			console.log(data.results);
		console.log('chatterbox: Message retrieved');
		},
		error: function (data) {
		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		console.error('chatterbox: Failed to retrieve message');
		}

		});
	}
}

