const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");s
const cubeCalc = require("../components/cubeCalc.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        const usr = interaction.user.id;
        let key = ['0','0','0','0','0'] ;

        if(interaction.commandName === '금제'){
            const modal = new ModalBuilder()
                .setCustomId('cube')
                .setTitle('큐브 (T3)');
            
            const cubeFirstInput = new TextInputBuilder()
                .setCustomId('cubeFirstInput')
                .setLabel('1금제 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('1금제 큐브 입장권 개수를 입력하세요.')
                .setValue(key[0]);

            const cubeSecondInput = new TextInputBuilder()
                .setCustomId('cubeSecondInput')
                .setLabel('2금제 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('2금제 큐브 입장권 개수를 입력하세요.')
                .setValue(key[1]);

            const cubeThirdInput = new TextInputBuilder()
                .setCustomId('cubeThirdInput')
                .setLabel('3금제 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('3금제 큐브 입장권 개수를 입력하세요.')
                .setValue(key[2]);

            const cubeFourthInput = new TextInputBuilder()
                .setCustomId('cubeFourthInput')
                .setLabel('4금제 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('4금제 큐브 입장권 개수를 입력하세요.')
                .setValue(key[3]);

            const cubeFivethInput = new TextInputBuilder()
                .setCustomId('cubeFivethInput')
                .setLabel('5금제 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('5금제 큐브 입장권 개수를 입력하세요.')
                .setValue(key[4]);
            
            const actionRowCubeFirst = new ActionRowBuilder().addComponents(cubeFirstInput);
            const actionRowCubeSecond = new ActionRowBuilder().addComponents(cubeSecondInput);
            const actionRowCubeThird = new ActionRowBuilder().addComponents(cubeThirdInput);
            const actionRowCubeFourth = new ActionRowBuilder().addComponents(cubeFourthInput);
            const actionRowCubeFiveth = new ActionRowBuilder().addComponents(cubeFivethInput);

            modal.addComponents(actionRowCubeFirst, actionRowCubeSecond, actionRowCubeThird, actionRowCubeFourth, actionRowCubeFiveth);
    
            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'cube';

            interaction
                .awaitModalSubmit({ filter, time: 30_000 })
                .then((modalInteraction) => {
                    const cubeFirstValue = modalInteraction.fields.getTextInputValue('cubeFirstInput');
                    const cubeSecondValue = modalInteraction.fields.getTextInputValue('cubeSecondInput');
                    const cubeThirdValue = modalInteraction.fields.getTextInputValue('cubeThirdInput');
                    const cubeFourthValue = modalInteraction.fields.getTextInputValue('cubeFourthInput');
                    const cubeFivethValue = modalInteraction.fields.getTextInputValue('cubeFivethInput');

                    const count = cubeFirstValue*1 + cubeSecondValue*1 + cubeThirdValue*1 + cubeFourthValue*1 + cubeFivethValue*1;
                    const rewards = cubeCalc(cubeFirstValue, cubeSecondValue, cubeThirdValue, cubeFourthValue, cubeFivethValue);

                    const cubeEmbed = new EmbedBuilder()
                        .setTitle('큐브 (T3) 예상 보상')
                        .setDescription(`입력한 큐브 \`${count}수\`의 대한 예상 보상입니다.`)
                        .addFields(
                            {
                                name: '보석',
                                value: 
                                `${((rewards[0][0])!=0)?`\`1렙\`: ${rewards[0][0]}개
                                    `:''}${((rewards[0][1])!=0)?`\`2렙\`: ${rewards[0][1]}개
                                    `:''}${((rewards[0][2])!=0)?`\`3렙\`: ${rewards[0][2]}개
                                    `:''}${((rewards[0][3])!=0)?`\`4렙\`: ${rewards[0][3]}개
                                    `:''}${((rewards[0][4])!=0)?`\`5렙\`: ${rewards[0][4]}개
                                    `:''}${((rewards[0][5])!=0)?`\`6렙\`: ${rewards[0][5]}개
                                    `:''}${((rewards[0][6])!=0)?`\`7렙\`: ${rewards[0][6]}개
                                    `:''}${((rewards[0][7])!=0)?`\`8렙\`: ${rewards[0][7]}개
                                    `:''}${((rewards[0][8])!=0)?`\`9렙\`: ${rewards[0][8]}개
                                    `:''}${((rewards[0][9])!=0)?`\`10렙\`: ${rewards[0][9]}개
                                    `:''}`,
                                inline: true
                            },
                            {
                                name: '추가 보상',
                                value:
                                `\`경명돌\`: ${rewards[1]}개
                                \`찬명돌\`: ${rewards[2]}개
                                \`카드경험치\`: ${rewards[3]}
                                \`은총\`: ${rewards[4]}개
                                \`축복\`: ${rewards[5]}개
                                \`가호\`: ${rewards[6]}개
                                \`실링\`: ${rewards[7]}`,
                                inline: true
                            }
                        )

                    modalInteraction.reply({ embeds: [cubeEmbed] });
                })
                .catch((err) => {
                    console.log(err);
                })
        };
    },
};