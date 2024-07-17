const axiosApi = require('./axiosApi.js'); 

async function getData(usrId){
    try{
        const axiosSiblingsData = await axiosApi(`/characters/${usrId}/siblings`);

        const res = await axiosSiblingsData.get();
        const tmp = ['', 0];

        for(const i in res.data){
            if(tmp[1]<(res.data[i].ItemMaxLevel.replace(",",''))*1){
                tmp[0] = res.data[i].CharacterName; 
                tmp[1] = (res.data[i].ItemMaxLevel.replace(",",''))*1;
            }
        };
        
        return res.status == 200 ? await mostNameData(tmp) : undefined;
    }catch(err){
        console.log(err);
    }
}

const mostNameData = async (mostId) => {
    try{
        const axiosAmoriesData = await axiosApi(`/armories/characters/${mostId[0]}`);
        const res = await axiosAmoriesData.get();

        return res.status == 200 ? await searchCharacterInfo(res.data) : undefined;
    }catch(err){
        console.log(err);
    }
}

function searchCharacterInfo(searchedUsr){
    
    if(searchedUsr != undefined){
        const result = {
            image: searchedUsr.ArmoryProfile.CharacterImage,
            serverName: searchedUsr.ArmoryProfile.ServerName,
            expeditionLevel:searchedUsr.ArmoryProfile.ExpeditionLevel,
            characterName: searchedUsr.ArmoryProfile.CharacterName,
            townName: searchedUsr.ArmoryProfile.TownName,
            characterLevel: searchedUsr.ArmoryProfile.CharacterLevel,
            characterClassName: searchedUsr.ArmoryProfile.CharacterClassName,
            characterTitle: searchedUsr.ArmoryProfile.Title,
            characterGuild: searchedUsr.ArmoryProfile.GuildName,
            itemAvgLevel: searchedUsr.ArmoryProfile.ItemAvgLevel,
            itemMaxLevel: searchedUsr.ArmoryProfile.ItemMaxLevel,
            armoryEquipment: [
                searchedUsr.ArmoryEquipment[0].Name,
                searchedUsr.ArmoryEquipment[1].Name,
                searchedUsr.ArmoryEquipment[2].Name,
                searchedUsr.ArmoryEquipment[3].Name,
                searchedUsr.ArmoryEquipment[4].Name,
                searchedUsr.ArmoryEquipment[5].Name
            ],
            tendencies: [
                searchedUsr.ArmoryProfile.Tendencies[0].Point,  // 지성
                searchedUsr.ArmoryProfile.Tendencies[1].Point,  // 담력
                searchedUsr.ArmoryProfile.Tendencies[2].Point,  // 매력
                searchedUsr.ArmoryProfile.Tendencies[3].Point   // 친절
            ],
            stats: [
                searchedUsr.ArmoryProfile.Stats[0].Value,   // 치명
                searchedUsr.ArmoryProfile.Stats[1].Value,   // 특화
                searchedUsr.ArmoryProfile.Stats[2].Value,   // 제압
                searchedUsr.ArmoryProfile.Stats[3].Value,   // 신속
                searchedUsr.ArmoryProfile.Stats[4].Value,   // 인내
                searchedUsr.ArmoryProfile.Stats[5].Value,   // 숙련
                searchedUsr.ArmoryProfile.Stats[6].Value,   // 최대 생명력
                searchedUsr.ArmoryProfile.Stats[7].Value    // 공격력
            ],
            engravings: []
        };

        if(searchedUsr.ArmoryEngraving != null){
            for(const idx in searchedUsr.ArmoryEngraving.Effects){
                    result.engravings[idx] = searchedUsr.ArmoryEngraving.Effects[idx].Name;
                
            }
        }
        return result;
    }else{
        console.log('error');
    }

    
}

module.exports = getData;