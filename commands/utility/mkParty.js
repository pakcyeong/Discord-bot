const { 
    SlashCommandBuilder, 
    StringSelectMenuBuilder, 
    StringSelectMenuOptionBuilder, 
    ActionRowBuilder, 
    EmbedBuilder, 
    ComponentType, 
    ButtonBuilder,
    ButtonStyle,
    time
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
            title: `${raidName}을 함께할 사람을 모집합니다.`,
            description: `신청 순으로 입력이 됩니다. 선택 후 변경이 되지 않습니다.`,
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
        
        const rowButtons = new ActionRowBuilder()
            .addComponents(firstButton, secondButton);

        const resBtn = await interaction.reply({
            embeds:[msgEmbed],
            components: [rowButtons]
        })

        const collectorBtn = resBtn.createMessageComponentCollector({ ComponentType:ComponentType.Button, time: 36_000_000 })

        // button abled
        collectorBtn.on('collect', async interactionBtn => {
            const tmp = msgEmbed.fields[0].value.concat(' ', msgEmbed.fields[1].value);
            const condition = tmp.split(' ');

            // choose dealer
            if(interactionBtn.customId === 'dealer'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[0].value = msgEmbed.fields[0].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
                return;
            }

            //choose supporter
            else if(interactionBtn.customId === 'supporter'){
                if(!condition.includes(interactionBtn.user.globalName)){
                    msgEmbed.fields[1].value = msgEmbed.fields[1].value.concat(' ',interactionBtn.user.globalName);
                }
                await interactionBtn.update({ embeds: [msgEmbed], components: [rowButtons] });
                return;
            }
        })

        //button disabled
        collectorBtn.on('end', () => {
            firstButton.setDisabled(true);
            secondButton.setDisabled(true);

            resBtn.edit({
                embeds: [msgEmbed],
                components: [rowButtons]
            })
        })
    }
}
