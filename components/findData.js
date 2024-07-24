const axiosApi = require("./axiosApi");
const regexp = require("./regexp");
const fs = require('fs');

async function findData(usrId){
    const api = await axiosApi(`/armories/characters/${usrId}?filters=profiles%2Bequipment%2Bengravings%2Bgems`);
    const apiget = await api.get();
    
    return apiget.status == 200 ? await setup(apiget.data) : undefined;
};

function setup(usr){
    if(usr != undefined){
        const dt = JSON.stringify(usr);
        const reg = regexp(dt);

        const result = {
            server: reg.ArmoryProfile.ServerName,
            name: reg.ArmoryProfile.CharacterName,
            level: reg.ArmoryProfile.CharacterLevel,
            itemLevel: reg.ArmoryProfile.ItemMaxLevel,
            guild: reg.ArmoryProfile.GuildName,
            title: reg.ArmoryProfile.Title,
            stats: [
                reg.ArmoryProfile.Stats[0].Value,
                reg.ArmoryProfile.Stats[1].Value,
                reg.ArmoryProfile.Stats[4].Value,
                reg.ArmoryProfile.Stats[3].Value,
                reg.ArmoryProfile.Stats[5].Value,
                reg.ArmoryProfile.Stats[6].Value,
                reg.ArmoryProfile.Stats[7].Value,
                reg.ArmoryProfile.Stats[8].Value
            ],
            
            

        }
    }else{
        console.log('\'../components/findData.js\' Error occured!');
    }
    
};

module.exports = findData;