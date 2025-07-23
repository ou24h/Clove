require('dotenv').config(); // تحميل بيانات من .env
const token = process.env.DISCORD_TOKEN;

const Discord = require('discord.js');
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.login(token);

const { readdirSync } = require('node:fs');
readdirSync('./handlers').forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

const userJokeState = new Map();

client.on(Discord.Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const msg = message.content.toLowerCase();

  // أوامر بسيطة
  const replies = {
    ping: 'pong',
    hello: 'Hello there!',
    bye: 'Goodbye!',
    help: 'Available commands: ping, hello, bye, help, info, joke...',
    info: 'This is a simple Discord bot created using Discord.js!',
    quote: 'The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt',
    inspire: 'Believe you can and you\'re halfway there. - Theodore Roosevelt',
    motivate: 'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston S. Churchill',
    weather: 'The weather is always sunny in the world of Discord bots!',
    news: '#📢┇𝑵𝑬𝑾𝑺',
    music: 'Music is the soundtrack of our lives! What\'s your favorite genre?',
    game: 'https://garticphone.com/ - Join this game with your friends!',
    fun: 'Fun is what we make of it! Let\'s enjoy our time together!',
    'i love you': 'I Love too 💋',
    support: 'If you need help, feel free to reach out to the support team!',
    feedback: 'We value your feedback! Let us know how we can improve!',
    test: 'This is a test message! Everything seems to be working fine!',
    status: 'The bot is online and ready to assist you!',
    commands: 'Here are the available commands: ping, hello, bye, help, info, joke, quote, inspire, motivate, weather, news, music, game, fun, love, support, feedback, test, status',
    card: 'Here is your card: 🃏',
  };

  if (replies[msg]) message.reply(replies[msg]);

  // بطاقة Embed
  if (msg === 'card') {
    const embed = new Discord.EmbedBuilder()
      .setAuthor({ name: 'Clove', iconURL: message.guild.iconURL() })
      .setTitle('Clove Bot')
      .setDescription('This is a response to your card command.')
      .setFields(
        { name: 'Rank', value: message.member.roles.highest.name, inline: true },
        { name: 'Author', value: message.author.username, inline: true }
      )
      .setColor('#c5b9cd')
      .setThumbnail(message.guild.iconURL())
      .setImage(client.user.avatarURL())
      .setFooter({ text: `${message.author.tag}`, iconURL: message.author.avatarURL() })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }

  // نكات تفاعلية: Knock Knock Jokes
  const jokes = {
    joke: ['joke1_step1', 'Knock knock.'],
    joke2: ['joke2_step1', 'Knock knock.'],
    joke3: ['joke3_step1', 'Knock knock.'],
  };

  if (jokes[msg]) {
    userJokeState.set(message.author.id, jokes[msg][0]);
    return message.reply(jokes[msg][1]);
  }

  const steps = {
    joke1_step1: ["who's there?", 'Hawaii.', 'joke1_step2'],
    joke1_step2: ['hawaii who?', 'I’m fine, Hawaii you?'],
    joke2_step1: ["who's there?", 'Nana.', 'joke2_step2'],
    joke2_step2: ['nana who?', 'Nana your business.'],
    joke3_step1: ["who's there?", 'You.', 'joke3_step2'],
    joke3_step2: ['you who?', 'Yoohooooo.'],
  };

  const state = userJokeState.get(message.author.id);
  if (steps[state] && msg === steps[state][0].toLowerCase()) {
    if (steps[state].length === 3) {
      userJokeState.set(message.author.id, steps[state][2]);
    } else {
      userJokeState.delete(message.author.id);
    }
    return message.reply(steps[state][1]);
  }
});
