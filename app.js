console.log("This gratitude bot works with Andrewstax");

var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);
var stream = T.stream('user');
var fs = require('fs');

function followed(event) {
    console.log('Followed event Running...');
    var screenName = event.source.screen_name;

    // function which replies to every user that follows
    tweetNow('@' + screenName + ' ' + 'Hello there and thanks for the follow! Feel free to check out our blog at http://www.andrewstax.ie/blog - we hope you find out insights interesting');

    // saves list of followers to txt file
    fs.appendFile("list_of_followers.txt", screenName + "\n");
}

function tweetNow(text) {
  var tweet = {status: text};
  
  // check username before RT, avoid reply to Self
  var n = text.search(/@andrewstax/i);
  
  if (n !== -1) {
    console.log('Tweet to Self... SKIPPED!');
  } else {
    T.post('statuses/update', tweet, function (err, data, response) {
    if (err) {
      console.log('Error replying...' + err);
    } else {
      console.log('Success in replying...');
    }
  });
  }
}

stream.on('follow', followed);
        


        
