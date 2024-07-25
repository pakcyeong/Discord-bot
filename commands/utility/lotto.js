const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = './components/json/lotto.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName("강화")
        .setDescription("로스트아크 강화 확률로 보는 오늘의 운세 입니다."),

    async execute(interaction){
        const graph = [100, 100, 50, 50, 40, 40, 30, 30, 15, 15, 10, 10, 5, 5];
        const usr = interaction.user.id;
        const j = fs.readFileSync(path, {encoding: 'utf-8', flag: 'r'});
        const data = JSON.parse(j);
        let key = [];
        
        if(Object.hasOwn(data, usr)) {key = data[usr];}
        else {key = [10,0]}

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
        
        if((key[0]*1)>26) {
            await interaction.reply({content: `이미 최고 강화 단계에 도달 하셨습니다. 음머`})
        }
        else{
            if(prob < graph[(key[0]*1)-10]){
                key[1] = 0;
                key[0] = key[0]*1 + 1;
                data[usr] = key;
                fs.writeFileSync(path,JSON.stringify(data));
                await interaction.reply({content: `강화에 성공했다. 음머 \`현재 재련 단계 : ${key[0]*1}\` (장기 ${key[1]*1}%)`})
            }else{
                if(key[1]==100){
                    key[1] = 0;
                    key[0] = key[0]*1 + 1;
                    data[usr] = key;
                    fs.writeFileSync(path,JSON.stringify(data));
                    await interaction.reply({content: `원트 ㅊㅊ, 스택 초기화다. 음머 \`현재 재련 단계 : ${key[0]*1}\` (장기 ${key[1]*1}%)`})
                }
                else{
                    key[1] = (key[1]*1) + (graph[(key[0]*1)-10]/25);
                    data[usr] = key;
                    fs.writeFileSync(path,JSON.stringify(data));
                    await interaction.reply({content: `${li[fail]}! \`현재 재련 단계 : ${key[0]}\` (장기 ${key[1]*1}%)`});
                }
            }
        }
    }
}