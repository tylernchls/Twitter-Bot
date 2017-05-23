const twit = require('twit');
const CONFIG = require('./bot_config');
const fs = require('fs');
const Twitter = new twit(CONFIG);
const stream = Twitter.stream('user');

function sendTweet() {

  let tweet = {
      status: message
  }
  function catchError(err, data, response) {
    if (err) {
      console.log('Something went wrong ' + err);
    } else {
      console.log('Success!!! Your Tweet Has Been Posted :)');
    }
  }

  Twitter.post('statuses/update', tweet, catchError());
}

function tweetEvent(tweetMsg) {

  const Twitter_Handle = tweetMsg.in_reply_to_screen_name;
  let msg_data = JSON.stringify(tweetMsg, null, 2)
  fs.writeFile('tweets.json', msg_data);
  let msg_text = tweetMsg.text;
  let sender = tweetMsg.user.screen_name;

  if(Twitter_Handle) {
    let respondTweet = ('@' + sender + " Thanks for the tweet");
    sendTweet(respondTweet);
  }
}

function newFollower(eventMessage) {

  let name = eventMessage.source.name;
  let user_screenName = eventMessage.source.screen_name;

  Twitter.post('direct_messages/new', {
      screen_name : user_screenName,
      text: "Whats up Brah"
    },
    function(err, data, response) {
      if(err) {
        console.log('Something went wrong ' + err);
      } else {
        console.log('Your direct message has been sent to ' + user_screenName);
      }
    });
}

stream.on('follow', newFollower);
stream.on('tweet', tweetEvent);










