const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        // ابحث عن القناة بالاسم
        const channel = member.guild.channels.cache.find(ch => ch.name === '💬┇𝑪𝑯𝑨𝑻' && ch.type === 0);
        if (channel) {
            channel.send(`لقد غادر ${member.user.tag} السيرفر.`);
        }
    }
};