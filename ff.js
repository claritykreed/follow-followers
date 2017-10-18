console.log("This bot checks the list of followers for a user and follows them");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
// var fs = require('fs');
var params = {
  screen_name: 'andrewstax',
  count: 200,
  cursor: -1,
  };


function followFollowers() { // follow anyone who is following me

	var count = 1;

	T.get('followers/list', params, (err, getdata, response) => {
		if (err) { console.log("There was a problem") } else { 
				console.log(getdata);
				getdata.users.forEach(user => 
				{
				// post user name in console
				console.log(count + ". " + params.screen_name + " is followed by " + user.id + ".");
				count = count +1;
				// save user name to files
				// fs.appendFile("list_of_followers.txt", user.name + "\n");
				// console.log(user.screen_name + "has been added to the txt file.");
				// follow user
				T.post('friendships/create', { screen_name: user.screen_name }, (err, data, resp) => {
				if (err) {
					console.log("There was a problem following " + user.screen_name +".") } else { 
					console.log(user.id + " has been followed.")}
				});
				});
			}
	});
}

setInterval(followFollowers(), 1000*60*60*24*3.5);