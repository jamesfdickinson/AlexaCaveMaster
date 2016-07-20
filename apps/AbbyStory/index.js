var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('abbystory');

//var caveMasterTemplate = new CaveMaster();
//var allActionWords = CaveMaster.getAllActions(CaveMaster.createRooms());

app.launch(function (req, res) {
    
    
    var audio = [
        "https://a961813f.ngrok.io/abbystories/20160719 205403.mp3' />"
        , "https://a961813f.ngrok.io/abbystories/20160719 205530.mp3"
            , "https://a961813f.ngrok.io/abbystories/20160719 205721.mp3"    ];
    var rand = audio[Math.floor(Math.random() * audio.length)];
    
    var sayText = "<audio src='"+encodeURI(rand)+"' />";
    console.log(sayText);
    res.say(sayText);
    
});

module.exports = app;
