const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("금제")
        .setDescription("큐브 (T3) 예상 보상을 확인합니다."),

    async execute(interaction){
        if(!interaction.isModalSubmit()) return;
    }
}