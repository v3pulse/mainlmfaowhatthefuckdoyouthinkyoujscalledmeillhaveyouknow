const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let createteam = message.guild.roles.find(r => r.name === args[1]);
	let error = new Discord.RichEmbed()
.setTitle("Invalid Usage")
.setDescription("Correct Usage: !t kick | !t invite | !t create | !t disband | !t join | !t leave | !t info")
.addField("**NOTE:**", "For this command to work properly please set a nickname, with !nickname (fortnite name) withot brackets.")
.setColor("#ff0000");
if(!args[0]) return message.reply(error);
if(args[0] === "create"){
	if(!message.member.nickname) return message.reply("Do !nickname (fortnite name) without brackets.");
	if(message.member.nickname.includes("[") && message.member.nickname.includes("]")) return message.reply("You are in a team");
  let teamrole = message.guild.roles.find(r => r.name === args[1].toUpperCase());
  if(!args[1]) return message.reply(error);
  if(teamrole) return message.reply("This team already exists");
  if(args[1].length <= 3) return message.reply("More than 3 letters please");
  if(args[1].length > 12) return message.reply("Less than 12 letters please");
  if(args[1].includes("nigg")) return message.reply("No racism please");
	message.member.guild.createRole({ name: args[1].toUpperCase(), color: "#ff0000", permissions:[] });
  message.member.setNickname(`[*${args[1].toUpperCase()}] ${message.member.nickname}`);
  message.reply(`Team ${args[1].toUpperCase()} created!`);
  


	message.member.addRole(message.guild.roles.find("name", args[1]));
	



  


  
}

if(args[0] === "disband"){
  let userpic = message.member.displayAvatarURL;
  let team = args[1].toUpperCase();
  let yeters = new Discord.RichEmbed()
  .setTitle("Invalid Usage")
  .setDescription("Try !t disband (team name) without brackets!")
  .setColor("#ff0000")
  .setFooter("Command sent at", userpic)
  .setTimestamp();

  if(!args[1]) return message.reply(yeters);
  if(!message.member.nickname.includes(`${args[1].toUpperCase()}]`)) return message.reply("Cant do that.");
  if(message.member.nickname.includes("[" && args[1].toUpperCase() && "*")){

    if(args[1]){

	message.member.setNickname(message.member.nickname.split(/ +/g).splice(1).join(" "));
      message.reply(`You have disbanded **${args[1].toUpperCase()}**`);
      message.guild.roles.find(r => r.name === team.delete("lmaokid"));
    }else{
      return message.reply(yeters);
      console.log("error");
    }
  }
}

if(args[0] === "invite"){
 //!t invite person name
  let ruser = message.guild.member(message.mentions.user.first() || message.guild.members.get(args[1]));
  if(!ruser) return message.reply("Please select a person to invite Example: (@person)");
  if(!args[2]) return message.reply("Try !t invite (@person) (team name) without brackets.");
  let inviterole = message.guild.roles.find(r => r.name === args[2]);
  if(ruser & args[2]){
    if(message.member.nickname.includes(args[2].toUpperCase() && message.member.nickname.includes("*")) && inviterole){
    ruser.addRole(inviterole);
    message.reply(`${ruser} has been invited to ${args[2]}`).then(msg => msg.delete(20000));
    message.reply(`${ruser} you have 20 seconds to do !t join (team name) without brackets`).then(msg => msg.delete(20000));

    const tm = ms => new Promise(res => setTimeout(res, ms))
    await tm(20000);
    ruser.removeRole(inviterole);
    
  }
    
  }
}

if(args[0] === "kick"){
  //!t kick user team
  let uesricon = message.member.displayAvatarURL;
  let trykick = new Discord.RichEmbed()
	.setTitle("Invalid Usage")
	.setDescription("Try !t kick (@user) (team) without brackets.")
	.setFooter("Command sent at", uesricon)
	.setTimestamp()
	.setColor("#ff0000");
	let usernot = new Discord.RichEmbed()
	.setTitle("Error")
	.setDescription("This user is not in your team!")
	.setFooter("Command sent at", uesricon)
	.setTimestamp()
	.setColor("#ff0000");
	let cannot = new Discord.RichEmbed()
	.setTitle("Invalid Usage")
	.setDescription("You cant kick people silly!")
	.setFooter("Command sent at")
	.setTimestamp()
	.setColor("#ff0000");
	let inteam = new Discord.RichEmbed()
	.setTitle("Invalid Usage")
	.setDescription("This user is not a member of your team")
	.setFooter("Command sent at", uesricon)
	.setTimestamp()
	.setColor("#ff0000");

  if(!message.member.nickname.includes("*")) return message.reply(cannot);
  if(!args[2]) return message.reply(trykick);
  if(!message.member.nickname.includes(`[*${args[2].toUpperCase()}]`)) return message.reply(usernot);
  let kick = message.guild.roles.find(r => r.name === args[2].toUpperCase());
  let ruser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
  if(!ruser.nickname.includes(`[${args[2].toUpperCase()}]`)) return message.reply(inteam);
  if(args[0] === "kick" && ruser && args[2]){

    if(ruser.roles.has(kick)){

      ruser.setNickname(message.member.nickname.split(/ +/g).splice(2).join(" "));
      ruser.removeRole(kick);
      message.reply(`${ruser} has been kicked from ${args[2].toUpperCase}`);
      
    }
  }
  
}

if(args[0] === "join"){
  if(!args[1]) return message.reply("Try !t join (team name) without brackets");
  //!t join team
  let invited = message.guild.roles.find(r => r.name === args[1].toUpperCase());
  if(!invited) return message.reply("Team not found");
  if(!message.member.nickname) return message.reply("Set a nickname please | !nickname (fortnite name) no brackets.");
  if(message.member.nickname.includes("[")) return message.reply("You are in a team, do !t disband or !t leave");
  if(!message.member.roles.has(args[1].toUpperCase())) return message.reply("You were not invited to this team");
  if(args[1].length > 3){

    message.member.setNickname(`[${args[1].toUpperCase()}] ${message.member.nickname}`);
    message.reply(`You have joined ${args[1].toUpperCase()}`);
    message.member.addRole(invited);
  }
  
  
}

if(args[0] === "leave"){
  //!t leave team
  if(!args[1]) return message.reply("Usage !t leave (team name) without brackets");
  let leave = message.guild.roles.find(r => r.name === args[1].toUpperCase());
  if(!leave) return message.reply("Team not found");
  if(!message.member.nickname.includes(`${args[1].toUpperCase()}]`)) return message.reply("You cannot leave a team that you're not in.");
  if(!message.member.roles.has(leave)) return message.reply("You are not in that team!");
  if(message.member.nickname.includes("*")) return message.reply("The owner of a team must use !t disband");

  message.member.setNickname(message.member.nickname.split(/ +/g).splice(1).join(" "));
  message.reply(`You have left ${args[1].toUpperCase()}`);
  message.member.removeRole(leave);


}
}
  


module.exports.help = {
  name: "t"
}
