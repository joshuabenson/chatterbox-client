// YOUR CODE HERE:
	/* var message = {
	  username: 'shawndrost',
	  text: 'trololo',
	  roomname: '4chan'
	};*/
var app =  {
init:function () {
app.fetch();


},

'lastcheck':null,
'rooms':{},
'returnData':{ },
'server': 'https://api.parse.com/1/classes/chatterbox',
"roomdone":{},

send:function(message){
	 $.ajax({
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
fetch: function(input){

	if (input===undefined) {
	  input = {order: "-createdAt"};
	}
		// data: 'where={"name": "vishal"}',
 
	 $.ajax({	
		url: app.server,
		type: 'GET',
		data: input,
		contentType: 'application/json',
		success: function (data) {
			app['returnData'] = data.results;
			app['rooms']={}
			for(var i = 0; i<app.returnData.length;i++){
				var temp = app.returnData[i];
				
				app['rooms'][temp.roomname]= app['rooms'][temp.roomname]||[];
				app['rooms'][temp.roomname].push([temp.username,temp.text,temp.createdAt]);
				app['lastcheck']=app.returnData[0].objectId;

			}
			app.autoaddroom()
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
  var tweet;
   if((login['Friend'].length>0) && (login.Friend.indexOf(message['username'])!==-1)) {
     
       tweet = '<div data-lobby="' + message.roomname + '" class ="tweet"><b><p class="username" data-name ="'+message.username+'">' + message.username + ':</p><p class="text">' + message.text + '</b></p></div>';
     } else {
       tweet = '<div data-lobby="' + message.roomname + '" class ="tweet"><p class="username" data-name ="'+message.username+'">' + message.username + ':</p><p class="text">' + message.text + '</p></div>';
   	}
	$('#chats').append(tweet);

	},
clearMessages:function(){
	var node = document.getElementById('chats');
	  while (node.firstChild){
	  	node.removeChild(node.firstChild);
	  }
	},
newMessage:function(){
  //get data from textbox
  var data = document.getElementById('textbox').value ;
  var user = login['name'] ;//user.name
  var message={
  	username:user,
  	text: data,
  	roomname: app.currentroom
  };
  app.send(message);
  app.init();
  setTimeout(function(){app.showRoom(app.currentroom); }, 1000);
  console.log(message);
},
addRoom:function(newRoom){
  	var room = '<div class="room" data-room="' + newRoom + '">' + newRoom + '</div>';
	$('#roomSelect').append(room);
	
},
autoaddroom: function(){
	for(var r in app.rooms){
		if(!(r in app['roomdone'])){
			app.addRoom(''+r);
			console.log(r)
			app['roomdone'][r]=0;
		}
	}
},
'currentroom':null,
showRoom:function(room) {  
  app.clearMessages();
//add all messages with property 'room' to div id="chats"
  for (var i = 0; i < app.rooms[room].length; i++) {
  	//0=user, 1=message, 2=date
  	var chatMessage = {username:app.rooms[room][i][0], text:app.rooms[room][i][1], roomname: app.rooms[room][i][2] }
  	app.addMessage(chatMessage);
  }
  app.currentroom= room;
},
addFriend:function(){

}
};
var login={
	'name':null,
	'Friend':[],
	'id': null
}
$(document).ready(function(){
	//event listener for room selection:
  $('#roomSelect').on('click','.room', function(){
    var room = $(this).data('room');
  	// console.log(app.rooms[room]);
	app.showRoom(room);
   });
  $('#submit').on('click', function(){
  	app.newMessage();
  	console.log("clicks")

  })
  var loggedin = false;
  $('#login').on('click',function(){
  	login['name'] = document.getElementById('username').value;
 
  	$('#login').hide();
  	$('#username').hide();
   	$.ajax({
		url: app.server,
		type: 'GET',
		data: 'where={"name":"'+login.name+'"}',
		contentType: 'application/json',
		success: function(data){
			if(data.results.length===1){login['id']=data.results[0]['objectId'];
				login['Friend']= data.results[0]['friends'];
			}
			else{var userinfo={'name':login['name'],
					'friends':[]
				};
				login['Friend'] = [];
				app.send(userinfo);
			}
			console.log();
			//if array is 1 do{pull friends to local and push later} else no 
		},
		error:function(){}

  	});
  });
	app.init();
	setInterval(function(){app.init()},20000);
		var node;
	$("#chats").on('click', '.username', function(){
		var name = $(this).data('name');
		if(confirm('Do you want to add a Friend')){console.log(name)}
		else{}
	})
	//onclickfunction(){if (loggedin){put to friends server using id}})
});

