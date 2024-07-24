const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('현삭')
        .setDescription("로스트아크 엘릭서 현삭 확률로 보는 오늘의 운세 입니다.")
        .addIntegerOption(option =>
            option
                .setName('현자번호')
                .setDescription('숫자로 입력')
                .setRequired(true)
        ),
    
    async execute(interaction){
        const num = interaction.options.getInteger('현자번호');
        const li = [
            '완벽하군요',
            '어때? 마음에 들어?',
            '결과로 보여주지',
            '음',
            '후회하지 않을걸세',
            '현자의 능력을 보여주죠'
        ];
        const cmt = Math.floor(Math.random()*li.length);
        if(num === 1){
            const prob = Math.floor(Math.random()*5);
            await interaction.reply({content: `${li[cmt]} \`${prob}\`다 음머`});
        }else if(num === 2){
            const prob = Math.floor(Math.random()*2);
            await interaction.reply({content: `${li[cmt]} \`${prob}\`다 음머`});
        }else if(num === 3){
            const prob = Math.floor(Math.random()*10);
            await interaction.reply({content: `${li[cmt]} \`${prob-4}\`다 음머`});
        }else{
            await interaction.reply({content: `번호는 1~3번까지다 음머`, ephemeral: true });            
        }
    }
}