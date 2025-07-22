const { 
    GatewayIntentBits, 
    ApplicationCommandType, 
    Events, 
    Routes,
    Collection,
    REST,
    SlashCommandBuilder
} = require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_TOKEN;
const { readdirSync } = require('node:fs');
const ascii = require('ascii-table');
const table = new ascii('Slash Commands').setJustify();
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = (client) => {
    client.commands = new Collection();
    const commands = [];
    const rest = new REST({ version: '10' }).setToken(token);

    readdirSync('./SlashCommands/').forEach(folder => {
        const commandFiles = readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/SlashCommands/${folder}/${file}`);

            if (command.name && command.description) {
                commands.push({
                    type: ApplicationCommandType.ChatInput,
                    name: command.name,
                    description: command.description,
                    options: command.options || []
                });
                client.commands.set(command.name, command);
                table.addRow(command.name, '🟢 Working');
            } else if (command.data && command.data.name) {
                client.commands.set(command.data.name, command);
                commands.push(command.data.toJSON());
                table.addRow(command.data.name, '🟢 Working');
            } else {
                table.addRow(file, '🔴 Not Working');
            }
        }
    });

    console.log(table.toString());

    client.once(Events.ClientReady, async c => {
        try {
            const data = await rest.put(
                Routes.applicationCommands(c.user.id),
                { body: commands }
            );
            console.log(`Started refreshing ${data.length} application (/) commands.`);
            console.log(`Successfully registered ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    });

    client.commands.set('ping', {
        data: new SlashCommandBuilder()
            .setName('ping')
            .setDescription('Shows For you bot ping'),
        async execute(interaction, client) {
            await interaction.reply({ content: `Bot Ping: ${client.ws.ping}ms` });
        },
    });
}    