var token = "NDI5MDUzNjE3ODIwMDA4NDUy.DZ8C1g.haf7LefVZO7jU7b4-jcfgJwP1og";
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
var pre = "/"

client.on('message', msg => {
client.user.setActivity("do " + pre + "help")
if (msg.content.startsWith(pre + "help"))
{
	msg.channel.send("```" + pre + "ship [name1] [name2] [gay/straight]\n" + pre + "ship [name] [self/alone]```")
}
if (msg.content.startsWith(pre + "ship")) {
if (msg.member.hasPermission("ADMINISTRATOR"))
{
var msgsplit = msg.content.split(" ");
if (msgsplit.length == 4){
if (msgsplit[3] == "gay"){
msg.guild.createChannel(msgsplit[1] + "x" + msgsplit[2], 'text')
.then(channel => {
channel.setParent('426866648260018189');
msg.channel.send("done")
});
}
else if (msgsplit[3] == "straight"){
msg.guild.createChannel(msgsplit[1] + "x" + msgsplit[2], 'text')
.then(channel => {
channel.setParent('426866712831328297');
msg.channel.send("done")
});
}
else {
msg.channel.send("you did it wrong")
}
}
else if (msgsplit.length == 3){
if (msgsplit[2] == "self"){
msg.guild.createChannel(msgsplit[1] + "x" + msgsplit[1], 'text')
.then(channel => {
channel.setParent('426866763876270121');
msg.channel.send("done")
});
}
else if (msgsplit[2] == "alone"){
msg.guild.createChannel(msgsplit[1] + "x", 'text')
.then(channel => {
channel.setParent('426867321827491840');
});
msg.channel.send("done")
}
else {
msg.channel.send("you did it wrong")
}
}
else {
msg.channel.send("u no has admin")
}
}
else {
if (msg.member.hasPermission("ADMINISTRATOR"))
{
msg.channel.send("you did it wrong")
}
else {
msg.channel.send("u no has admin")
}
}
}
});

client.login(token);