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
        .setDescription('레이드 공대를 모집합니다.')
        .addStringOption(option => 
            option
                .setName('레이드명')
                .setDescription('레이드 명')
                .setRequired(true)
        ),
    async execute(interaction) {
        const raidName = interaction.options.getString('레이드명');
        let msgEmbed = {
            title: `${raidName} 레이드 공대를 모집합니다.`,
            description: `신청 순으로 입력이 됩니다. 추가적인 파티 조정이 필요합니다.`,
            author: {
                name: interaction.user.globalName,
                icon_url: interaction.user.displayAvatarURL()
            },
            fields: [
                {
                    name: `\`딜러\``, value: ``
                },
                {
                    name: `\`서폿\``, value: ``
                }
            ],
        }

        const firstButton = new ButtonBuilder()
            .setCustomId('dealer')
            .setLabel('딜러')
            .setStyle(ButtonStyle.Primary);

        const secondButton = new ButtonBuilder()
            .setCustomId('supporter')
            .setLabel('서폿')
            .setStyle(ButtonStyle.Success);
        
        const rowButtons = new ActionRowBuilder()
            .addComponents(firstButton, secondButton);

        const resBtn = await interaction.reply({
            embeds:[msgEmbed],
            components: [rowButtons]
        })

        const collectorBtn = resBtn.createMessageComponentCollector({ ComponentType:ComponentType.Button, time: 3_600_000 })

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