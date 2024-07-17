const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { errorEmbedImg, errorEmbed } = require("../../components/embeds/errorEmbed.js");
const getData = require("../../components/getData.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("본캐")
        .setDescription("본캐 검색용")
        .addStringOption(option => 
            option
                .setName('닉네임')
                .setDescription('닉네임 입력')
                .setRequired(true)
            ),

    async execute(interaction) {
        const usrName = interaction.options.getString('닉네임');
        const usrData = await getData(usrName);

        if(usrData != undefined){
            const embedInstance = {
                title: usrData.characterName,
                url: `https://iloa.gg/character/${usrData.characterName}`, 
                fields: [
                    {
                        name: `\*\*기본정보\*\*`,
                        value: 
                            `\`서버\` : ${usrData.serverName}
                            \`클래스\` : ${usrData.characterClassName}
                            \`길드\` : ${(usrData.characterGuild != null ? usrData.characterGuild : '')}
                            \`영지\` : ${usrData.townName}
                            \`칭호\` : ${(usrData.characterTitle != null ? usrData.characterTitle : '')}`,
                        inline: true,
                    },
                    {
                        name: `\*\*추가정보\*\*`,
                        value: 
                            `\`전투 레벨\` : ${usrData.characterLevel}
                            \`원정대 레벨\` : ${usrData.expeditionLevel}
                            \`평균 레벨\` : ${usrData.itemAvgLevel}
                            \`도달 레벨\` : ${usrData.itemMaxLevel}
                            \`공격력\` : ${usrData.stats[7]}
                            \`최대생명력\` : ${usrData.stats[6]}`,
                        inline: true,
                    },
                    {
                        name: '\*\*전투특성\*\*',
                        value: 
                            `\`치명\` : ${usrData.stats[0]}
                            \`특화\` : ${usrData.stats[1]}
                            \`신속\` : ${usrData.stats[3]}
                            \`제압\` : ${usrData.stats[2]}
                            \`인내\` : ${usrData.stats[4]}
                            \`숙련\` : ${usrData.stats[5]}`,
                        inline: true,
                    },
                    {
                        name: '\*\*성향정보\*\*',
                        value: 
                            `\`지성\` : ${usrData.tendencies[0]}
                            \`담력\` : ${usrData.tendencies[1]}
                            \`매력\` : ${usrData.tendencies[2]}
                            \`친절\` : ${usrData.tendencies[3]}
                            `,
                        inline: true,
                    },
                    {},
                    {
                        name: '\*\*장비정보\*\*',
                        value: 
                            `${usrData.armoryEquipment[0]}
                            ${usrData.armoryEquipment[1]}
                            ${usrData.armoryEquipment[2]}
                            ${usrData.armoryEquipment[3]}
                            ${usrData.armoryEquipment[4]}
                            ${usrData.armoryEquipment[5]}
                            `,
                        inline: true,
                    }
                ],
                thumbnail: {
                    url:`${usrData.image}`
                }
            };
            if(usrData.engravings != null){
                embedInstance.fields[4] = {
                    name: `\*\*각인정보\*\*`,
                    value: '',
                    inline: true
                }
                for(const idx of usrData.engravings.values()) {
                    embedInstance.fields[4].value = embedInstance.fields[4].value.concat(
                        `
                        `, idx);
                }
            }
            if(usrData.armoryEquipment != null){
                const regexp = /[^0-9]/g;
                embedInstance.fields[5] = {
                    name: '\*\*장비정보\*\*',
                    value: '',
                    inline: true
                }
                for(const idx of usrData.armoryEquipment.values()) {
                    const addStr = `${idx.slice(4)} \`${idx.replace(regexp, '')}\``
                    embedInstance.fields[5].value = embedInstance.fields[5].value.concat(
                        `
                        `, addStr);
                }
            }

                
            await interaction.reply({embeds:[embedInstance]});
        } 
        
        else {
            await interaction.reply({embeds:[errorEmbed], files:[errorEmbedImg], ephemeral: true })
        }
    },
};