const { SlashCommandBuilder } = require("discord.js");
const arkpasv = require('../../components/arkpasv');
const regexp = require('../../components/regexp');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('앜패')
        .setDescription('유저의 아크패시브를 조회합니다.')
        .addStringOption(option => 
            option
                .setName('유저명')
                .setDescription('유저 닉네임')
                .setRequired(true)
        ),
    async execute(interaction) {
        const usrName = interaction.options.getString('유저명');
        const usrData = await arkpasv(usrName);
        console.log(usrData);

        let msgEmbed = {
            title: `${usrName}`,
            description: ``,
            author: {
                name: interaction.user.globalName,
                icon_url: interaction.user.displayAvartarURL()
            },
            fields: [
                {
                    name: `\`포인트\``, value: ``
                },
                {
                    name: '\u200B', value: '\u200B'
                },
                {
                    name: `\`진화\``, value: ``, inline: true
                },
                {
                    name: `\`깨달음\``, value: ``, inline: true
                },
                {
                    name: `\`도약\``, value: ``, inline: true
                }
            ],
        };
        
        if(usrData === undefined) {
            await interaction.reply({ content: '문제가 발생했습니다. 잠시 후에 검색해주세요', ephemeral: true })
        } 
        else {
            if(usrData.IsArkPassive != true) {
                await interaction.reply({ content: '아크패시브를 킨 유저가 아닙니다.', ephemeral: true });
            }
            else {
                usrData.Points.map(point => {
                    msgEmbed.fields[0].concat(`${point.Name}: ${point.Value} `);
                });

                usrData.Effects.map(effect => {
                    if(effect.Name === 'enlightenment') { // 깨달음
                        msgEmbed.fields[3].value.concat(`${regexp(effect.Description)}
                        `);
                    }
                    else if (effect.Name === 'evolution') { // 진화
                        msgEmbed.fields[2].value.concat(`${regexp(effect.Description)}
                        `);
                    }
                    else if (effect.Name === 'leap') { // 도약
                        msgEmbed.fields[4].value.concat(`${regexp(effect.Description)}
                        `);
                    }
                })
            };
        }
        await interaction.reply({ embeds: [msgEmbed], ephemeral: true })
        
    }
}