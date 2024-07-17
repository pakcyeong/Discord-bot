const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("해금")
        .setDescription("큐브 (T4) 예상 보상을 확인합니다."),

    async execute(interaction){
        if(!interaction.isModalSubmit()) return;
    }
}