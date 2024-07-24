const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("강화")
        .setDescription("로스트아크 강화 확률로 보는 오늘의 운세 입니다."),

    async execute(interaction){
        const prob = Math.floor(Math.random()*100);
        const fail = Math.floor(Math.random()*3);
        const li = [
            '당연히 실패했다 음머, 다음에 도전하도록',
            '강화에 실패했다 음머, 되겠냐 음머',
            '이번에도 실패했다 음머'
        ];
        
        if(prob === 1){
            await interaction.reply({contents: '이걸 강화에 성공했다. 스택 초기화다 음머'})
        }else{
            await interaction.reply({contents: li[fail]});
        }
    }
}