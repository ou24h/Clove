const { Events, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        console.log('عضو جديد دخل:', member.user.tag);

        // جرب استخدام ChannelType.GuildText
        const channel = member.guild.channels.cache.find(
            ch => ch.name === '🪪┇𝐖𝐄𝐋𝐎𝐎𝐌𝐄' && ch.type === ChannelType.GuildText
        );
        const roleName = '𝐿𝐸𝑉𝐸𝐿 1';

        if (channel) {
            const embed = new EmbedBuilder()
                .setColor('#c5b9cd')
                .setTitle('حياك الله في سيرفر Clove')
                .setDescription(`Welcome to Clove Server!\n${member}`)
                .setImage('https://github.com/ou24h/png/blob/main/yreAbNdLuX.png?raw=true')
                .setFooter({ text: `${member.user.tag}` , iconURL: member.user.displayAvatarURL() });
            await channel.send({ content: `${member}`, embeds: [embed] });

            // إعطاء العضو رتبة تلقائياً
            const role = member.guild.roles.cache.find(r => r.name === roleName);
            if (role) {
                await member.roles.add(role);
            }
        } else {
            console.log('القناة غير موجودة أو النوع غير صحيح');
        }
    }
};