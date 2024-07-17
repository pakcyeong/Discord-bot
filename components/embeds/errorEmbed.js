const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

const errorEmbedImg = new AttachmentBuilder('./images/error.png');
const errorEmbed = new EmbedBuilder()
    .setColor(0xff3333)
    .setTitle('버그콩')
    .setDescription('아마 대부분 버그입니다. 나중에 다시 시도해주세요')
    .setImage('attachment://error.png')
    .setTimestamp()

exports.errorEmbed = errorEmbed;
exports.errorEmbedImg = errorEmbedImg;