const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('도움')
        .setDescription('봇 사용방법을 보여줍니다.'),
    async execute(interaction){
        const helpEmbed = new EmbedBuilder()
            .setTitle("사용법")
            .setDescription('디스코드 봇의 사용법을 알려줍니다.')
            .addFields(
                {
                    name: '`/금제`',
                    value: '로스트아크 시즌2의 5개의 금제의 예상 보상을 알려줍니다.'
                },
                {
                    name: '`/해금`',
                    value: '로스트아크 시즌3의 1개의 해금의 예상 보상을 알려줍니다.'
                }
            )
        await interaction.reply({ embeds: [ helpEmbed ], ephemeral: true })
    }
}
