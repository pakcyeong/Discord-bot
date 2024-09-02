const { 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ComponentType, 
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('모집')
        .setDescription('게임 할 사람을 모집합니다.')
        .addStringOption(option => 
            option
                .setName('게임명')
                .setDescription('게임 명')
                .setRequired(true)
        ),
    async execute(interaction) {
        const raidName = interaction.options.getString('게임명');
        let msgEmbed = {
            title: `${raidName} 할 사람!`,
            description: `신청 순으로 입력이 됩니다.`,
            author: {
                name: interaction.user.globalName,
                icon_url: interaction.user.displayAvatarURL()
            },
            fields: [
                {
                    name: `\`참가\``, value: ``
                },
                {
                    name: `\`불참\``, value: ``
                }
            ],
        }

        const firstButton = new ButtonBuilder()
            .setCustomId('dealer')
            .setLabel('참여')
            .setStyle(ButtonStyle.Primary);

        const secondButton = new ButtonBuilder()
            .setCustomId('supporter')
            .setLabel('불참')
            .setStyle(ButtonStyle.Success);

        const thirdButton = new ButtonBuilder()
            .setCustomId('call')
            .setLabel('참여자 호출')
            .setStyle(ButtonStyle.Danger);
        
        const rowButtons = new ActionRowBuilder()
            .addComponents(firstButton, secondButton, thirdButton);

        const resBtn = await interaction.reply({
            embeds:[msgEmbed],
            components: [rowButtons]
        })

        const collectorBtn = resBtn.createMessageComponentCollector({ ComponentType:ComponentType.Button })

        // button abled
        collectorBtn.on('collect', async interactionBtn => {
            const tmp = msgEmbed.fields[0].value.concat(' ', msgEmbed.fields[1].value);
            const condition = tmp.split(' ');
            const conditionUp = msgEmbed.fields[0].value.split(' ');
            const conditionDown = msgEmbed.fields[1].value.split(' ');

            // choose dealer
            if(interactionBtn.customId === 'dealer'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.concat(' ',interactionBtn.user.globalName);
                }else if(conditionDown.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.replace(` ${interactionBtn.user.globalName}`,'');
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
                return;
            }

            //choose supporter
            else if(interactionBtn.customId === 'supporter'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.concat(' ',interactionBtn.user.globalName);
                }else if(conditionUp.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.replace(` ${interactionBtn.user.globalName}`,'');
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
                return;
            }

            else if(interactionBtn.customId === 'call'){
                if(conditionUp.length >= 1){
                    const list = '';
                    conditionUp.map(usr => {
                        list = list.concat('@', usr, ' ');
                    })
                    await interactionBtn.reply('참여하시는 분들 모여주세요')
                    await interactionBtn.followUp(`${list}`);
                }else{
                    await interactionBtn.reply({ content: '아직 참여자가 모이지 않았습니다.', ephemeral: true })
                }
            }
        })
    }
}
