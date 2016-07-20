var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('helloworld');
app.launch(function (req, res) {
    var quote = [
        "Hello Abby!! <break strength='medium'/> How are you today? "
        ,"Would you like Fruit Loops for breakfast? Or would you like a waffle? <break time='1s'/> Or would you like to eat socks? Yummy Yummy socks!"
        ,"You are so silly!"
        ,"I'm not Alexa!<break strength='medium'/> You are Alexa <break time='1s'/> Alexa, <break time='1s'/>say something funny."
        ,"Moo <break strength='medium'/> Moo <break strength='medium'/> Moo"
        ,"A B C D E F G H I J K L M N O P, Q R S, and Loose tooth T, U V W X Y and Z, Now i know my a b c's, next time won't you sing with me"
    ];
    var rand = quote[Math.floor(Math.random() * quote.length)];
    
    
    console.log(rand);
    res.say(rand);
   
});

app.intent('NameIntent', {
		"slots":{"NAME":"LITERAL","AGE":"NUMBER"}
		,"utterances":["{My name is|my name's} {matt|bob|bill|jake|nancy|mary|jane|NAME} and I am {1-100|AGE}{ years old|}"]
	},function(req,res) {
		res.say('Your name is '+req.slot('NAME')+' and you are '+req.slot('AGE')+' years old');
	}
);
app.intent('AgeIntent', {
		"slots":{"AGE":"NUMBER"}
		,"utterances":["My age is {1-100|AGE}"]
	},function(req,res) {
		res.say('Your age is '+req.slot('AGE'));
	}
);
module.exports = app;
