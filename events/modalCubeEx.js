const { Events, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const cubeExCalc = require("../components/cubeExCalc.js");

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
        const usr = interaction.user.id;
        let key = [0, 0];

        if(interaction.commandName === '해금'){
            const modal = new ModalBuilder()
                .setCustomId('cubeEx')
                .setTitle('큐브 (T4)');
            
            const cubeExFirstInput = new TextInputBuilder()
                .setCustomId('cubeExFirstInput')
                .setLabel('1해금 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('1해금 큐브 입장권 개수를 입력하세요.')
                .setValue(key[0]);

	const cubeExSecondInput = new TextInputBuilder()
                .setCustomId('cubeExSecondInput')
                .setLabel('2해금 큐브')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('2해금 큐브 입장권 개수를 입력하세요.')
                .setValue(key[1]);
            
            const actionRowCubeExFirst = new ActionRowBuilder().addComponents(cubeExFirstInput);
	const actionRowCubeExSecond = new ActionRowBuilder().addComponents(cubeExSecondInput);
            
            modal.addComponents(actionRowCubeExFirst, actionRowCubeExSecond);
    
            await interaction.showModal(modal);

            const filter = (interaction) => interaction.customId === 'cubeEx';

            interaction
                .awaitModalSubmit({ filter, time: 30_000 })
                .then((modalInteraction) => {
                    const cubeExFirstValue = modalInteraction.fields.getTextInputValue('cubeExFirstInput');
		const cubeExSecondValue = modalInteraction.fields.getTextInputValue('cubeExSecondInput');

                    const count = cubeExFirstValue*1 + cubeExSecondValue*1
                    const rewards = cubeExCalc(cubeExFirstValue, cubeExSecondValue);

                    const cubeExEmbed = new EmbedBuilder()
                        .setTitle('큐브 (T4) 예상 보상')
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
                                `\`돌파석\`: ${rewards[1]}개
                                \`카드경험치\`: ${rewards[2]}
                                \`용암의 숨결\`: ${rewards[3]}개
                                \`빙하의 숨결\`: ${rewards[4]}개
                                \`실링\`: ${rewards[5]}`,
                                inline: true
                            }
                        )

                    modalInteraction.reply({ embeds: [cubeExEmbed] });
                })
                .catch((err) => {
                    console.log(err);
                })
        };
    },
};
