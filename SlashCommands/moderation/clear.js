const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('يمسح عدد من الرسائل في الشات')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('عدد الرسائل التي تريد مسحها')
                .setRequired(true)
        ),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        if (!interaction.member.permissions.has('ManageMessages')) {
            return interaction.reply({ content: 'ليس لديك صلاحية لمسح الرسائل!', ephemeral: true });
        }
        if (amount < 1 || amount > 100) {
            return interaction.reply({ content: 'يمكنك مسح من 1 إلى 100 رسالة فقط.', ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({ content: `تم مسح ${amount} رسالة!`, ephemeral: true });
    },
};