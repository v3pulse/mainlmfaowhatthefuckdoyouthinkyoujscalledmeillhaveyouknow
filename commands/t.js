const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let error = new Discord.RichEmbed()
	.setTitle("Invalid Usage!")
	.setDescription("Correct Usage: *!t kick | !t invite | !t create | !t disband | !t join | !t leave*")
	.addField("**NOTE:**", "Remember, for this to work properly, please set a nickname, with !nickname (your fortnite name) without brackets.")
	.setColor(6812512);
	if(!args[0]) return message.reply(error);   
	if(args[0] === "create"){
	if(message.member.nickname.includes("[" && "]")){
	message.reply("You are already in a team!");
		return;
	}
	let teamrole = message.guild.roles.find(r => r.name === args[1].toUpperCase());
	
	if(!args[1]) return;
	if(args[1].length <= 3) return message.reply("More than 3 letters please.");
	if(args[1].length > 12) return message.reply("Team name must be less than 12 letters");
	if(args[1].includes("nigg")) return message.reply("Stop that!");
	message.member.setNickname(`[*${args[1].toUpperCase()}] ${message.member.nickname}`);
	message.reply(`Team ${args[1]} Created!`);
	  if(!teamrole){
	  	try {
			  teamrole = await message.guild.createRole({
			  	name: args[1].toUpperCase(),
			  	color: "#ff0000",
		  		permissions:[]
				
	  		})
			
			  message.member.addRole(message.guild.roles.find("name", args[1]));

	  		message.guild.channels.forEach(async (channel, id) => {
			  	await channel.overwritePermissions(teamrole, {
				  	ADD_REACTIONS: false
			  	});


		  	});
		
		
		

	   	}catch(e){
		  	console.log(e.stack);
			
	  	}	
	if(teamrole){
	return message.reply(`**${args[1].toUpperCase()}** has already been created!`);
	}
	
	
	}
	if(args[0] === "disband"){
	let yeters = new Discord.RichEmbed()
	.setTitle("Invalid Usage")
	.setDescription("Try !t disband (team name) without brackets.")
	.setFooter("Command sent at")
	.setTimestamp()
	.setColor("#ff0000");
	if(!args[1]) return message.reply(yeters);
	if(!message.member.nickname.includes(`${args[1].toUpperCase()}]`)) return message.reply("Cant do that.");
	if(message.member.nickname.includes("[" && args[1] && "*")){
	if(args[1]){
	message.member.setNickname(message.member.nickname.split(/ +/g).splice(1).join(" "));
	message.reply(`You have disbanded **${args[1].toUpperCase()}**`);
	message.guild.roles.find(role => role.name === args[1].toUpperCase()).delete("lmaokid");

	
	}else{
	return message.reply("!t disband (team name) without brackets!");
	}
	}
	}
	if(args[0] === "invite"){
	let ruser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
	if(!ruser) return message.reply("Please select a person to invite");
		
	if(ruser){
	ruser.addRole(message.guild.roles.find("name", "Invited"));
	message.reply(`${ruser} has been invited.`).then(msg => msg.delete(20000));
	message.reply(`${ruser}, you have 20 seconds to do !t join (team name) without brackets`).then(msg => msg.delete(20000));
	const tm = ms => new Promise(res => setTimeout(res, ms))
	await tm(20000);
	ruser.removeRole(message.guild.roles.find("name", "Invited"));
	}
	
	}

	if(args[0] === "kick"){
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
	if(!message.member.nickname === args[2].toUpperCase()) return message.reply(usernot);
	let kick = message.guild.roles.find(r => r.name === args[2].toUpperCase());
	let ruser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
	if(!ruser.nickname.includes(args[2].toUpperCase())) return message.reply(inteam);
	if(args[0] === "kick" && ruser && args[2]){
	if(ruser.nickname.includes("[") && ruser.nickname.includes(args[2].toUpperCase()) && ruser.roles.has(kick)){
	ruser.setNickname(message.member.nickname.split(/ +/g).splice(2).join(" "));
	ruser.removeRole(kick);
	message.reply(`${ruser} has been kicked from ${args[2]}`);
	}
	}
	}
	
// 	if(args[0] === "info"){
// 		const coderoles = message.guild.roles
// 		.filter(r => r.name === "")
// 		.sort((roleA, roleB) => roleA.name.localeCompare(roleB.name))
// 		.array();
// 		let usercon = message.member.displayAvatarURL;
// 		let cantman = new Discord.RichEmbed()
// 		.setTitle("Invalid Usage")
// 		.setDescription("Try !t info (team name) without brackets")
// 		.setFooter("Command sent at", usercon)
// 		.setTimestamp()
// 		.setColor("#ff0000");
// 		let notyours = new Discord.RichEmbed()
// 		.setTitle("Error")
// 		.setDescription(`${args[1]} isnt your team!, try doing !t info (your team name) without brackets.`)
// 		.setFooter("Command sent at", usercon)
// 		.setTimestamp()
// 		.setColor("#ff0000");
// 		if(!args[1]) return message.reply(cantman);
// 		if(args[2]) return message.reply(cantman);
// 		if(!message.member.nickname.includes(`${args[1].toUpperCase}]`)) return message.reply(notyours);
// 		let teamembed = new Discord.RichEmbed()
// 		.setTitle(`Members of ${args[1]}`)
// 		.setColor(6812512)
// 		.setDescription()
// 		.setFooter("Command sent at", usercon)
// 		.setTimestamp();
		
		
		
	
// 	}
	if(args[0] === "join"){
	let invited = message.guild.roles.find(r => r.name === "Invited");
	if(!message.member.nickname) return message.reply("Please set a nickname with !nickname (fortnite name) without brackets.");
	if(!args[1]) return message.reply("!t join (team name) without brackets.");
	if(message.member.nickname.includes("[")) return message.reply("You are in a team, do !t disband or !t leave");
	if(!message.member.roles.find(r => r.name === "Invited")) return message.reply("Sorry, i cant do that.");
	let join = message.guild.roles.find(r => r.name === args[1].toUpperCase());
	if(args[1].length > 3 && join){
	message.member.setNickname(`[${args[1].toUpperCase()}] ${message.member.nickname}`);
	message.reply(`You have joined ${args[1].toUpperCase()}`);
	message.member.removeRole(message.guild.roles.find(r => r.name === "Invited"));
	message.member.addRole(message.guild.roles.find(r => r.name === args[1].toUpperCase()));
	
	}else{
	message.reply("Error.");
	}
	}
	if(args[0] === "leave"){
	
	if(!args[1]) return message.reply("Usage !t leave (team name) without brackets.");
	let leave = message.guild.roles.find(r => r.name === args[1].toUpperCase());
	
	if(!message.member.nickname.includes(`${args[1].toUpperCase()}]`)) return message.reply("You cannot leave a team that you're not in.");
	if(message.member.nickname.includes("*")) return message.reply("The owner of a team must use !t disband");
		
	if(leave){
	message.member.setNickname(message.member.nickname.split(/ +/g).splice(1).join(" "));
	message.reply(`You have left **${args[1]}**.`);
	message.member.removeRole(message.guild.roles.find(r => r.name === args[1].toUpperCase()));
	}else{
	return message.reply("Team does not exist.");
	}
	
	}
  
}

module.exports.help = {
  name: "t"
}
