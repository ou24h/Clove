const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('طرد عضو من السيرفر (❖ Admiral ❖,❖ Owner ❖,❖ STAFF ❖,❖ System ❖ فقط)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('العضو الذي تريد طرده')
                .setRequired(true)
        ),
    async execute(interaction) {
        const member = interaction.options.getMember('user');
        // اسم الرتبة المطلوبة للطرد
        const allowedRoles = ['❖ Admiral ❖', '❖ Owner ❖', '❖ STAFF ❖', '❖ System ❖']; // أضف أسماء الرتب هنا

        // تحقق من وجود أي رتبة من الرتب المسموحة عند المستخدم
        if (!interaction.member.roles.cache.some(role => allowedRoles.includes(role.name))) {
            return interaction.reply({ content: 'هذا الأمر متاح فقط لأعضاء الرتب المسموحة!', ephemeral: true });
        }

        if (!member) {
            return interaction.reply({ content: 'لم أجد العضو المطلوب!', ephemeral: true });
        }

        if (!member.kickable) {
            return interaction.reply({ content: 'لا يمكنني طرد هذا العضو!', ephemeral: true });
        }

        await member.kick();
        await interaction.reply({ content: `تم طرد ${member.user.tag} من السيرفر!` });
    },
};