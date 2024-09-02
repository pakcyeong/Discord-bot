const { SlashCommandBuilder } = require("discord.js");
const research = require("../../components/research");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('조회')
        .setDescription('해당 유저의 정보를 조회합니다.')
        .addStringOption(option => 
            option
                .setName('유저명')
                .setDescription('유저 닉네임')
                .setRequired(true)
        ),
    async execute(interaction){
        const usrName = interaction.options.getString('유저명');
        const usrData = await research(usrName);

        await interaction.reply({ content: usrName, ephemeral: true })
    }
}