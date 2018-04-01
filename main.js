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

for(k in data["boats"]){
    try{
        data["boats"][k].takenTurn = false;
    }catch(err){
        console.log(err);
    }
}

function distance(a,b){
    return Math.sqrt(((a.x-b.x)*(a.x-b.x))+((a.y-b.y)*(a.y-b.y)));
}



client.on('message', msg => {
    content = msg.content.split(" ");
    if(content[0] == call+"boatstats"){
        if(data["boats"][msg.author.id] == null){
            msg.channel.send("you dont have a boat!");
        }else{
            var temp = "";
            for(k in data["boats"][msg.author.id]){
                temp+=k+": "+data["boats"][msg.author.id][k]+"\n";
            }
            msg.channel.send(temp);
        }
    }

    if(content[0] == call+"makeboat"){
        if(data["boats"][msg.author.id] == null){
            if(content[1] != null && content[2] != null){
                if(content[1] == "convoy" || content[1] == "destroyer" || content[1] == "cruiser" || content[1] == "submarine"){
                    var alreadyExists = false;
                    for(k in data["boats"]){
                        try{
                            if(data["boats"][k].name.toLowerCase() == content[2].toLowerCase()){
                                alreadyExists = true;
                            }
                        }catch(err){
                            console.log(err);
                        }
                    }
                    if(alreadyExists){
                        msg.channel.send("that name is already taken");
                    }else{
                        msg.channel.send("the "+content[2]+" is ready for combat!");
                        data["boats"][msg.author.id] = new boat(0,0,content[1],content[2]);
                    }
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
    if(data["boats"][msg.author.id] != null){
        if(content[0] == call+"moveboat"){
            if(data["boats"][msg.author.id].takenTurn){
                msg.channel.send("you already took an action recently!");
            }else{
                var m = "heading "+content[1];
                if(content[1] == "north")
                    data["boats"][msg.author.id].y++;
                else if((content[1] == "east"))
                    data["boats"][msg.author.id].x++;
                else if((content[1] == "south"))
                    data["boats"][msg.author.id].y--;
                else if((content[1] == "west"))
                    data["boats"][msg.author.id].x--;
                else
                    m = "only north, east, south, and west";
                msg.channel.send(m);
                data["boats"][msg.author.id].takenTurn = true;
                setTimeout(function(){
                    try{
                        data["boats"][msg.author.id].takenTurn = false;
                    }catch(err){
                        console.log(err);
                    }
                },5000)
            }
        }

        if(content[0] == call+"mapboat"){
            var map = "";
            var range = data["boats"][msg.author.id].range
            for(var y = data["boats"][msg.author.id].y+(range); y>data["boats"][msg.author.id].y+(range*-1)-1;y--){
                for(var x = data["boats"][msg.author.id].x + (range * -1); x<data["boats"][msg.author.id].x+range+1;x++){
                    var tempPos = {};
                    tempPos["x"] = x;
                    tempPos["y"] = y;
                    if(distance(tempPos,data["boats"][msg.author.id]) < range){
                        var boatExists = false;
                        for(k in data["boats"]){

                            if(data["boats"][k] != null){
                                if(data["boats"][k].x == x && data["boats"][k].y == y){
                                    map+=data["boats"][k].name.charAt(0);
                                    boatExists = true
                                    break;
                                }
                            }
                        }
                        if(!boatExists){
                            if(Math.random()>0.9){
                                map+="~";
                            }else{
                                map+="."
                            }
                        }
                    }else{
                        map+=" ";
                    }
                }
                map+="\n";
            }
            msg.channel.send("```"+map+"```");
        }

        if(content[0] == call+"listboat"){
            var temp = "";
            for(k in data["boats"]){
                if(distance(data["boats"][k],data["boats"][msg.author.id]) < data["boats"][msg.author.id].range)
                    temp+="`"+data["boats"][k].name+" : "+data["boats"][k].type+"`\n";
                else
                    temp+="`"+data["boats"][k].name+" : Too far for any more intel`";
            }
            msg.channel.send(temp);
        }

        if(content[0] == call+"upgradeboat"){
            if(content[1] != null){
                if(data["boats"][msg.author.id].xp >= 1){
                    if(content[1] == "fixall"){
                        data["boats"][msg.author.id].xp--;
                        data["boats"][msg.author.id].hp = data["boats"][msg.author.id].maxHp;
                        msg.channel.send("your boat is fully healed! you have "+data["boats"][msg.author.id].xp+" xp left");
                    }else if(content[1] == "range"){
                        if(data["boats"][msg.author.id].range<10){
                            data["boats"][msg.author.id].xp--;
                            data["boats"][msg.author.id].range++;
                            msg.channel.send("range upgraded, you can now shoot farther! you have "+data["boats"][msg.author.id].xp+" xp left");
                        }else{
                            msg.channel.send("you already have max range!");
                        }
                    }else if(content[1] == "attack"){
                        if(data["boats"][msg.author.id].attack<5){
                            data["boats"][msg.author.id].xp--;
                            data["boats"][msg.author.id].attack++;
                            msg.channel.send("attack upgraded, you can now shoot larger shells! you have "+data["boats"][msg.author.id].xp+" xp left");
                        }else{
                            msg.channel.send("you already have max attack!");
                        }
                    }else if(content[1] == "dodge"){
                        if(data["boats"][msg.author.id].dodge<7){
                            data["boats"][msg.author.id].xp--;
                            data["boats"][msg.author.id].dodge++;
                            msg.channel.send("dodge upgraded, you can now avoid more hits! you have "+data["boats"][msg.author.id].xp+" xp left");
                        }else{
                            msg.channel.send("you already have max dodge!");
                        }
                    }else if(content[1].toLowerCase() == "maxhp"){
                        if(data["boats"][msg.author.id].maxHp<15){
                            data["boats"][msg.author.id].xp--;
                            data["boats"][msg.author.id].maxHp++;
                            data["boats"][msg.author.id].hp = data["boats"][msg.author.id].maxHp;
                            msg.channel.send("Maximum Hp upgraded, you can now take more damage! you have "+data["boats"][msg.author.id].xp+" xp left");
                        }else{
                            msg.channel.send("you already have max hp!");
                        }
                    }else{
                        msg.channel.send("you can fixall, upgrade maxhp, dodge, attack, or range");
                    }
                }else{
                    msg.channel.send("you need XP to buy upgrades");
                }
            }else{
                msg.channel.send("you need to specifiy what to spend XP on,");
            }
        }

        if(content[0] == call+"givexp"){
            if(content[1] != null){
                if(content[2] != null){
                    for(k in data["boats"]){
                        if(data["boats"][k].name == content[1]){
                            if(content[2] > data["boats"][msg.author.id].xp){
                                msg.channel.send("you dont have that much XP");
                            }else{
                                data["boats"][msg.author.id].xp-=content[2];
                                data["boats"][k].xp+=parseInt(content[2]);
                            }
                        }
                    }
                }else{
                    msg.channel.send("you need to specify how much");
                }
            }else{
                msg.channel.send("you need to specify who to give it to");
            }
        }

        if(content[0] == call+"attackboat"){
            if(content[1] != null){
                var foundBoat = false;
                for(k in data["boats"]){
                    if(data["boats"][k].name.toLowerCase() == content[1].toLowerCase()){
                        foundBoat = true;
                        if(distance(data["boats"][k],data["boats"][msg.author.id])<data["boats"][msg.author.id].range){
                            if(data["boats"][msg.author.id].takenTurn == false){
                                data["boats"][msg.author.id].takenTurn = true;
                                setTimeout(function(){
                                    try{
                                        data["boats"][msg.author.id].takenTurn = false;
                                    }catch(err){
                                        console.log(err);
                                    }
                                },5000)
                                if(Math.random() < (data["boats"][k].dodge/10)){
                                    msg.channel.send("they dodged your attack! "+"<@"+k+">");
                                }else{
                                    if(data["boats"][msg.author.id].type != "convoy"){
                                        data["boats"][k].hp -= data["boats"][msg.author.id].attack;
                                        if(data["boats"][k].hp <= 0){
                                            msg.channel.send(data["boats"][k].name+" has sunk!");
                                            delete data["boats"][k];
                                            data["boats"][msg.author.id].xp++;
                                        }else{
                                            msg.channel.send("you attacked "+data["boats"][k].name+" and did "+data["boats"][msg.author.id].attack+" damage, they have "+data["boats"][k].hp+" left, <@"+k+">");
                                        }
                                    }else{
                                        if(data["boats"][k].hp<data["boats"][k].maxHp){
                                            data["boats"][k].hp+=data["boats"][msg.author.id].attack;
                                            msg.channel.send("you repaired "+data["boats"][k].name+", you cant repair anything or move for the next 30 seconds");
                                            if(data["boats"][k].hp > data["boats"][k].maxHp){
                                                data["boats"][k].hp = data["boats"][k].maxHp;
                                            }
                                            data["boats"][msg.author.id].takenTurn = true;
                                            setTimeout(function(){
                                                try{
                                                    data["boats"][msg.author.id].takenTurn = false;
                                                }catch(err){
                                                    console.log(err);
                                                }
                                            },30000)
                                        }
                                    }
                                }
                            }else{
                                msg.channel.send("you already took an action recently!");
                            }
                        }else{
                            msg.channel.send("They are out of range!");
                        }
                        break;
                    }
                }
                if(!foundBoat){
                    msg.channel.send("there is no boat with that name!");
                }
            }else{
                msg.channel.send("you need to choose a target");
            }
        }
    }
    save();
});
client.login(token);
