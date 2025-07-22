const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('إيقاف الموسيقى وخروج البوت من الروم الصوتي'),
    async execute(interaction) {
        const connection = getVoiceConnection(interaction.guild.id);
        if (connection) {
            connection.destroy();
            await interaction.reply({ content: 'تم إيقاف الموسيقى وخروج البوت.' });
        } else {
            await interaction.reply({ content: 'البوت ليس في أي روم صوتي.', ephemeral: true });
        }
    },
};