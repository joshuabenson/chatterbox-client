// YOUR CODE HERE:
	/* var message = {
	  username: 'shawndrost',
	  text: 'trololo',
	  roomname: '4chan'
	};*/
var app =  {
init:function () {
app.fetch();
for(var i = 0; i<app.returnData.length;i++){
	var temp = app.returnData[i];
	if (temp.objectId===app.lastcheck){break;}
	app['rooms'][temp.roomname]= app['rooms'][temp.roomname]||[];
	app['rooms'][temp.roomname].push([temp.username,temp.text,temp.createdAt]);
	app['lastcheck']=app.returnData[0].objectId;

	}



},

'lastcheck':null,
'rooms':{},
'returnData':{ },
'server': 'https://api.parse.com/1/classes/chatterbox',

send:function(message){
	return $.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: app.server,
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
fetch: function(){
	
	 $.ajax({	
		url: app.server,
		type: 'GET',
		data: {order: "-createdAt"},
		contentType: 'application/json',
		success: function (data) {
			app['returnData'] = data.results;
			console.log('chatterbox: Message retrieved');
		},
		error: function (data) {
		// See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
		console.error('chatterbox: Failed to retrieve message');
		}
		});
	 // return obj;
		
	},
addMessage:function(message) {
// loop find last date in html, find position in data array. put all messages from that point to current time. this is a single message but it will be used in a loop.
// var message = {
//           username: 'Mel Brooks',
//           text: 'Never underestimate the power of the Schwartz!',
//           roomname: 'lobby'
//         };
	var tweet = '<div data-lobby=' + message.roomname + '><p class="username" data-name ='+message.username+'>' + message.username + ':</p><p class="text">' + message.text + '</p></div>';
	$('#chats').append(tweet);

	},
clearMessages:function(){
	var node = document.getElementById('chats');
	  while (node.firstChild){
	  	node.removeChild(node.firstChild);
	  }
	},
addRoom:function(newRoom){
  var room = '<div class="room" data-room=' + newRoom + '>' + newRoom + '</div>';
	$('#roomSelect').append(room);
},
addFriend:function(){

}
};
app.init();

$(document).ready(function(){
	console.log('works');	
	setInterval(function(){app.init()},1000);
		var node;
	
	for (var room in app.rooms) {
	node = '<button class="room">' + room + '</button>'
	$('#roomSelect').append(node);	
	}
});

