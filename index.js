require('dotenv').config(); // ← تحميل بيانات من .env
const token = process.env.DISCORD_TOKEN; // ← استخراج التوكن

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

// بعد تعريف client والتوكن، نقدر نستخدمه:
client.login(token);

const { readdirSync } = require('node:fs');
readdirSync('./handlers').forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const userJokeState = new Map();


client.on(Discord.Events.MessageCreate, async message => {
    if (message.author.bot) return; // Ignore messages from botsclient.login(token);


    if (message.content === 'ping') {
        message.reply('pong');
    }
    if (message.content === 'hello') {
        message.reply('Hello there!');
    }
    if (message.content === 'bye') {
        message.reply('Goodbye!');
    }
    if (message.content === 'help') {
        message.reply('Available commands: ping, hello, bye');
    }
    if (message.content === 'info') {
        message.reply('This is a simple Discord bot created using Discord.js!');
    }
    // joke knock knock
    if (message.content === 'joke') {
        userJokeState.set(message.author.id, 'joke1_step1');
        return message.reply('Knock knock.');
    }
    if (userJokeState.get(message.author.id) === 'joke1_step1' && message.content.toLowerCase() === "who's there?") {
        userJokeState.set(message.author.id, 'joke1_step2');
        return message.reply('Hawaii.');
    }
    if (userJokeState.get(message.author.id) === 'joke1_step2' && message.content.toLowerCase() === "hawaii who?") {
        userJokeState.delete(message.author.id);
        return message.reply('I’m fine, Hawaii you?');
    }
    //end of jokes

    // joke knock knock2
    if (message.content === 'joke2') {
        userJokeState.set(message.author.id, 'joke2_step1');
        return message.reply('Knock knock.');
    }
    if (userJokeState.get(message.author.id) === 'joke2_step1' && message.content.toLowerCase() === "who's there?") {
        userJokeState.set(message.author.id, 'joke2_step2');
        return message.reply('Nana.');
    }
    if (userJokeState.get(message.author.id) === 'joke2_step2' && message.content.toLowerCase() === "nana who?") {
        userJokeState.delete(message.author.id);
        return message.reply('Nana your business.');
    }
    //end of jokes

    // joke knock knock3
    if (message.content === 'joke3') {
        userJokeState.set(message.author.id, 'joke3_step1');
        return message.reply('Knock knock.');
    }
    if (userJokeState.get(message.author.id) === 'joke3_step1' && message.content.toLowerCase() === "who's there?") {
        userJokeState.set(message.author.id, 'joke3_step2');
        return message.reply('You.');
    }
    if (userJokeState.get(message.author.id) === 'joke3_step2' && message.content.toLowerCase() === "you who?") {
        userJokeState.delete(message.author.id);
        return message.reply('Yoohooooo.');
    }
    //end of jokes
    if (message.content === 'quote') {
        message.reply('The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt');
    }
    if (message.content === 'inspire') {
        message.reply('Believe you can and you\'re halfway there. - Theodore Roosevelt');
    }
    if (message.content === 'motivate') {
        message.reply('Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill');
    }
    if (message.content === 'weather') {
        message.reply('The weather is always sunny in the world of Discord bots!');
    }
    if (message.content === 'news') {
        message.reply('#📢┇𝑵𝑬𝑾𝑺 ');
    }
    if (message.content === 'music') {
        message.reply('Music is the soundtrack of our lives! What\'s your favorite genre?');
    }  
    if (message.content === 'game') {
        message.reply('https://garticphone.com/ - Join this game with your friends!');
    }
    if (message.content === 'fun') {
        message.reply('Fun is what we make of it! Let\'s enjoy our time together!');
    }
    if (message.content === 'I love you') {
        message.reply('I Love too 💋');
    }
    if (message.content === 'support') {
        message.reply('If you need help, feel free to reach out to the support team!');
    }
    if (message.content === 'feedback') {
        message.reply('We value your feedback! Let us know how we can improve!');
    }
    if (message.content === 'test') {
        message.reply('This is a test message! Everything seems to be working fine!');
    }
    if (message.content === 'status') {
        message.reply('The bot is online and ready to assist you!');
    }
    if (message.content === 'commands') {
        message.reply('Here are the available commands: ping, hello, bye, help, info, joke, quote, inspire, motivate, weather, news, music, game, fun, love, support, feedback, test, status');
    }
    if (message.content === 'card') {
        message.reply('Here is your card: 🃏');
        let embed = new Discord.EmbedBuilder()
        .setAuthor({ name: 'Clove', iconURL: message.guild.iconURL})
        .setTitle('Clove Bot')
        .setDescription('This is a response to your ping command.')
        .setFields(
            { name: 'Rank', value: message.member.roles.highest.name, inline: true },
            { name: 'Author', value: message.author.username, inline: true }
        )
        .setColor('#c5b9cd')
        .setThumbnail(message.guild.iconURL())
        .setImage(client.user.avatarURL())
        .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
        .setTimestamp();

        message.reply({ embeds: [embed] });
    }
});

client.login(token);