var token = "NDI5MDI4NjA5NjM4OTI0Mjg5.DZ7riw.UefSp6c-YGdcK37FM5i3_i3qvZA";
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const boat = require("./boat.js");
var data = require("./data.json");
var call = "!";
if(data["boats"] == null){
    data["boats"] = {};
}

function save(){
	var temp = JSON.stringify(data);
	fs.writeFile("./data.json",temp,function(err) {
		console.log(err);
	});
}

client.on('message', msg => {
    content = msg.content.split(" ");
    if(content[0] == call+"boatstats"){
        if(data["boats"][msg.author.id] == null){
            msg.channel.send("you dont have a boat!");
        }else{
            msg.channel.send(data["boats"][msg.author.id]);
        }
    }

    if(content[0] == call+"makeboat"){
        if(data["boats"][msg.author.id] == null){
            if(content[1] != null && content[2] != null){
                if(content[1] == "convoy" || content[1] == "destroyer" || content[1] == "cruiser" || content[1] == "submarine"){
                    msg.channel.send("the "+content[2]+" is ready for combat!");
                    data["boats"][msg.author.id] = new boat(0,0,content[1],content[2]);
                }else{
                        msg.channel.send("the only kinds of boats are, cruisers, submarines, convoys, and destroyers");
                }
            }else{
                msg.channel.send("to make a boat, use `"+call+"makeboat [type] [name]`");
            }
        }else{
            msg.channel.send("you already have a boat!");
        }
    }
});
client.login(token);
