const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('يشغل أغنية من يوتيوب')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('رابط اليوتيوب')
                .setRequired(true)
        ),
    async execute(interaction) {
        const url = interaction.options.getString('url');
        if (!ytdl.validateURL(url)) {
            return interaction.reply({ content: 'الرابط غير صحيح أو ليس من يوتيوب!', ephemeral: true });
        }
        const voiceChannel = interaction.member.voice?.channel;
        if (!voiceChannel) {
            return interaction.reply({ content: 'ادخل روم صوتي أولاً!', ephemeral: true });
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, { filter: 'audioonly' });
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });

        await interaction.reply({ content: 'جاري تشغيل الأغنية!' });
    },
};