var token = "NDI5MDI4NjA5NjM4OTI0Mjg5.DZ7riw.UefSp6c-YGdcK37FM5i3_i3qvZA";
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
var data = require("./data.json");

function save(){
	var temp = JSON.stringify(data);
	fs.writeFile("./data.json",temp,function(err) {
		console.log(err);
	});
}

client.on('message', msg => {
    
});
client.login(token);
