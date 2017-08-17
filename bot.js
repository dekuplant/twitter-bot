/*!
 * Bot.js : A Twitter bot that can retweet in response to the tweets matching particluar keyword
 * Version 1.0.0
 * Created by Debashis Barman (http://www.debashisbarman.in)
 * License : http://creativecommons.org/licenses/by-sa/3.0
 */

/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'BkFrVgyOSmVoe0EUJQAB1ebt4';
var TWITTER_CONSUMER_SECRET = '3VKjY4rxCdVlnAXhhRiJCK75TPybGaK7tNzzoaWySRleijO4Z3';
var TWITTER_ACCESS_TOKEN = '897986692128178176-xa4kq8DvoTA99JrhfDLCsCg0A9eiz8S';
var TWITTER_ACCESS_TOKEN_SECRET = 'EUY7tPR2PSWvbKLsaMHF5IKDCYqqpmhDvgvBIHe6uEvop';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#MAGA, #ImpeachTrump';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotInit() : To initiate the bot */
function BotInit() {
	
	function BotInitiated (error, data, response) {
		if (error) {
			console.log('Bot could not be initiated, : ' + error);
		}
		else {

		}
	}
	
	BotRetweet();
}

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);
			
			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}
	
	/* Set an interval of 30 minutes (in microsecondes) */
	//setInterval(BotRetweet, 30*60*1000);
	setInterval(BotRetweet, 30*60*1000);
}

/* Initiate the Bot */
BotInit();
