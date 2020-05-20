require('dotenv').config();

const Discord = require('discord.js');
const botCommands = require('./commands');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = process.env.BOT_TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}`);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  
  if (!bot.commands.has(command)){
    return;
  }

  console.info(`Called command: ${command}`);

  try {
    bot.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(`There was an error trying to execute command : ${command}`);
    console.error(error);
    msg.reply(`There was an error trying to execute command : ${command}`);
  }
  console.info('===================================');
});
