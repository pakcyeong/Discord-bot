const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('임티')
        .setDescription('인게임 이모티콘을 사용합니다')
        .addStringOption(option => 
            option.setName('이모티콘')
                .setDescription('인게임 이모티콘을 입력합니다.')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
        const choices = [
           '감사', '긁자', '꺼억', '눈누', '더줘', '도망', '뿅',
           '슬퍼', '씨앗', '우마이', '잘자', '충격', '츄릅', '크',
           '털썩', '할짝'
        ];
        const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice }))
        )
    },
    async execute(interaction) {
        const emojiName = interaction.options.getString('이모티콘');
        const emoji = new AttachmentBuilder(`./components/emoji/${emojiName}.gif`)
        const emojiEmbed = new EmbedBuilder()
            .setImage(`attachment://${emojiName}.gif`)
            .setFooter({
                text: interaction.user.globalName,
                iconURL: interaction.user.displayAvatarURL()
            })

        await interaction.reply({
            embeds: [emojiEmbed], files:[emoji]
        });
    },
};