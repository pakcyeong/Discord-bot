const { 
    SlashCommandBuilder, 
    ActionRowBuilder, 
    ComponentType, 
    ButtonBuilder,
    ButtonStyle,
    AttachmentBuilder
} = require("discord.js");
const msgEmbedImg = new AttachmentBuilder('./images/nolza.png');

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
        const gameName = interaction.options.getString('게임명');
        let msgEmbed = {
            title: `놀자에요!`,
            description: `${gameName} 을/를 할 사람을 모집합니다. @here`,
            author: {
                name: interaction.user.globalName,
                icon_url: interaction.user.displayAvatarURL(),
            },
            image: {
                url: 'attachment://nolza.png',
            },
            fields: [
                {
                    name: `\`참가\``, value: ``
                },
                {
                    name: `\`불참\``, value: ``
                }
            ],
            footer: {
                text: '꼭 같이 하자에요'
            }
        }

        const firstButton = new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('참여')
            .setStyle(ButtonStyle.Success);

        const secondButton = new ButtonBuilder()
            .setCustomId('reject')
            .setLabel('불참')
            .setStyle(ButtonStyle.Danger);
        
        const rowButtons = new ActionRowBuilder()
            .addComponents(firstButton, secondButton);

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

            // choose accept
            if(interactionBtn.customId === 'accept'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.concat(' ',interactionBtn.user.globalName);
                }else if(conditionDown.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.replace(` ${interactionBtn.user.globalName}`,'');
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
            }

            //choose reject
            else if(interactionBtn.customId === 'reject'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.concat(' ',interactionBtn.user.globalName);
                }else if(conditionUp.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.replace(` ${interactionBtn.user.globalName}`,'');
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
            }
        })
    }
}
