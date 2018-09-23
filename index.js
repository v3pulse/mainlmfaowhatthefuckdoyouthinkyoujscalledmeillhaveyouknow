const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});
const apikey = process.env.APIKEY;
const fs = require("fs");
const botconfig = require("./botconfig.json");
const token = process.env.BOT_TOKEN;


bot.commands = new Discord.Collection();
 
fs.readdir("./commands/", (err, files) => {
 
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
 
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setStatus('available');
  bot.user.setActivity("to your commands!", {type: "LISTENING"});
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  const setupCMD = "!createrolemessage";
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let banMSG = message.content.toUpperCase();
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
  if(message.channel.id === "493506505514156042"){
const reactions = ["🥇", "🥈", "🥉"];

	function generateMessages(){
	const initialMessage = `**React below based on your region.**`;
	const roles = ["NA-E", "NA-W", "EU"];

	var messages = [];
	messages.push(initialMessage);
	for(let role of roles) messages.push(`React below if your region is **${role}**!`);
	return messages;
}
    if(message.member.roles.find(r => r.name === "Management") && message.content.toLowerCase() == setupCMD){
  var toSend = generateMessages();
	  let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
	    for(let mapObj of mappedArray){
	    message.channel.send(mapObj[0]).then( sent => {
	    if(mapObj[1]){
	    sent.react(mapObj[1]);
	    }
	    });
	    }
  }
  }
   let xpAdd = Math.floor(Math.random() * 7) + 8;
	
	const xp = require("./xp.json");
	if(!xp[message.author.id]){
	xp[message.author.id] = {
	xp: 0,
		level: 1
	};
	}
	
	let curxp = xp[message.author.id].xp;
	let curlvl = xp[message.author.id].level;
	let nxtLvl = xp[message.author.id].level * 300;
	xp[message.author.id].xp = curxp + xpAdd;
	
	if(nxtLvl <= xp[message.author.id].xp){
	if(message.channel.id === "478949150340153358") return;
	xp[message.author.id].level = curlvl + 1;
	let lvlup = new Discord.RichEmbed()
	.setTitle("Level Up")
	.setDescription("**You have leveled up!**")
	.addField("New Level! ", curlvl + 1)
	.setColor(6812512);
		
	message.reply(lvlup).then(msg => msg.delete(5000));

	}
	const fs = require("fs");
	fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
		
		if(err) console.log(err)
	});
	
	
	if(message.channel.id === "481865517393510402") {
		if(message.content || banMSG.includes(`!`)) {
			message.delete();
		}
	}
	if(message.channel.id === "486337146106675202" && message.member.roles.find(r => r.name === "Scrim Staff")){
		if(message.content.includes("-")){
		message.delete();
		message.channel.send("------------------------------------------");
		let servericon = bot.user.displayAvatarURL;
		let hosticon = message.author.displayAvatarURL;
		let announcement = new Discord.RichEmbed()
		.setTitle("Announcement!")
		.setThumbnail(servericon)
		.setDescription("**Join Snipe Countdown in 10 Minutes!**")
		.addField("Snipes are starting soon!", "*Be sure to join the talk channel!*", true)
		.setFooter("Please be ready", hosticon)
		.setTimestamp()
		.setColor(16760937);
			
		await message.channel.send(announcement);
			
		message.channel.send("------------------------------------------");
		}
	   
	   }
	if(message.channel.id === "482044199504707584"){
		if(message.content || banMSG.includes(`!`)){
			message.delete();
		}
	}
 
  
 
});
 
bot.on('guildMemberAdd', member => {
		let platChannel = member.guild.channels.find('name', 'choose-platform');
		var role = member.guild.roles.find('name', 'Starter');

	platChannel.send("Welcome", + member.toString()).then(msg => msg.delete(500));
	member.addRole(role);
	
	
	member.guild.channels.find('name', 'choose-platform').sendMessage(member.toString() + " Set platform!");
	platChannel.bulkDelete(1);
  
 
  
  
});

bot.on('raw', event => {
	
		const initialMessage1 = `**React below based on your region.**`;

	if(event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){
		
	let channel = bot.channels.get(event.d.channel_id);
	let message = channel.fetchMessage(event.d.message_id).then(msg => {
	let user = msg.guild.members.get(event.d.user_id);
		
		if(msg.author.id == bot.user.id && msg.content != initialMessage1){
			
			let re = new RegExp(`\\*\\*(.+)?(?="\\*\\*)`);
            		var role = msg.content.match(re)[1];
			
			if(user.id != bot.user.id){
			var roleObj = msg.guild.roles.find('name', role);
			var memberObj = msg.guild.members.get(user.id);
			
// 			if(user.roles.has(msg.guild.roles.find(r => r.name === "NA-E"))) return;
// 			if(user.roles.has(msg.guild.roles.find(r => r.name === "NA-W"))) return;
// 			if(user.roles.has(msg.guild.roles.find(r => r.name === "EU"))) return;
				
			if(event.t === "MESSAGE_REACTION_ADD"){
			memberObj.addRole(roleObj)
			}else{
			memberObj.removeRole(roleObj);
			}
		}
	}
	})
	
	
}
	
});





bot.login(token);
