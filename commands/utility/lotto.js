const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("강화")
        .setDescription("로스트아크 강화 확률로 보는 오늘의 운세 입니다."),

    async execute(interaction){
        const prob = Math.floor(Math.random()*1000);
        const li = [
            '당연히 실패했다 음머, 다음에 도전하도록',
            '강화에 실패했다 음머, 되겠냐 음머',
            '이번에도 실패했다 음머',
            '정말로 된다고 생각했나? 음머',
            '겠냐?',
            '실패한 너가 뭘 할 수 있는데, 음머',
            '오늘은 진짜 안될거 같으니 강화 누르지마라, 음머',
            '펑',
            '허ㅋ접ㅋ',
            '넌 못지나간다',
            'ㅋㅎㅋㅎㅋㅎㅋㅋㅋㅋ',
            '응 아니야'
        ];
        const fail = Math.floor(Math.random()*li.length);
        
        if(prob > 15){
            await interaction.reply({content: '강화에 성공했다. 스택 초기화다 음머'})
        }else{
            await interaction.reply({content: `${li[fail]}!`});
        }
    }
}