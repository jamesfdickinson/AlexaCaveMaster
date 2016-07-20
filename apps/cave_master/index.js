var alexa = require('alexa-app');
var CaveMaster = require('./cavemaster.js');
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('cavemaster');

//var caveMasterTemplate = new CaveMaster();
//var allActionWords = CaveMaster.getAllActions(CaveMaster.createRooms());

app.launch(function (req, res) {


    var caveMaster = new CaveMaster();
    var currentRoom = caveMaster.currentRoom;
    var sndPath = encodeURI('https://8fa556c8.ngrok.io/' + caveMaster.currentRoom.soundPath);

    res.shouldEndSession(false);
    res.session("currentRoom", currentRoom.name);
    res.say("<audio src='" + sndPath + "' />");

    //  res.say("<audio src='https://8fa556c8.ngrok.io/output.mp3' />");

});
var getAllActions = function () {
    var caveMasterTemplate = new CaveMaster();
    var allActionWords = caveMasterTemplate.getAllActions();
    return allActionWords.join("|");
}
app.intent('ActionIntent', {
    "slots": { "ACTION": "LITERAL" }
    , "utterances": ["{" + getAllActions() + "|ACTION} "]
}, function (req, res) {
    var action = req.slot('ACTION');
    if (typeof action == "undefined") action = "";

    if (action == "stop" || action == "end") {
        res.shouldEndSession(true);
        return;
    }


    var currentRoomName = req.session('currentRoom');

    var caveMaster = new CaveMaster(currentRoomName);

    var newRoom = caveMaster.processSpeech(req.slot('ACTION'));

    if (newRoom != null) {
        var sndPath = encodeURI('https://8fa556c8.ngrok.io/' + newRoom.soundPath);
        res.session("currentRoom", newRoom.name);
        res.say("<audio src='" + sndPath + "' />");

        if (newRoom.autoMove) {
            var newRoomNext = newRoom.nextRooms[0];
            var sndPath2 = encodeURI('https://8fa556c8.ngrok.io/' + newRoomNext.soundPath);
            res.session("currentRoom", newRoomNext.name);
            res.say("<audio src='" + sndPath2 + "' />");
        }
    } else {
        //todo: get all options
        res.shouldEndSession(false);
        res.session("currentRoom", currentRoomName);
        res.say("That is not a command you can use in this room.");
        res.say("Try, " + caveMaster.getAllActions(caveMaster.currentRoom.nextRooms));
    }

    res.shouldEndSession(false);
}
);


module.exports = app;
