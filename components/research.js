const axiosApi = require("./axiosApi");
const etcregexp = require("./etcregexp");

//profiles%2Bequipment%2Bengravings%2Bgems

async function research(usr){
    const inst = await axiosApi(`/armories/characters/${usr}?filters=equipment`);
    const res = await inst.get();
    
    return res.status == 200 ? await setup(res.data) : undefined;
};

function setup(data){
    if(data != undefined){
        const dataStr = JSON.stringify(data);
        const dataReg = etcregexp(dataStr);
        console.log(dataReg);
        // const result = {
        //     img:dataReg.ArmoryPofile.CharacterImage,
        //     name:dataReg.ArmoryPofile.CharacterName,
        //     server:dataReg.ArmoryPofile.ServerName,
        //     itmLv:dataReg.ArmoryPofile.ItemAvgLevel,
        //     btlLv:dataReg.ArmoryPofile.CharacterLevel,
        //     grpLv:dataReg.ArmoryPofile.ExpeditionLevel,
        //     guild:dataReg.ArmoryPofile.GuildName,
        //     stats:[ //치특신제인숙
        //         dataReg.ArmoryPofile.Stats[0],
        //         dataReg.ArmoryPofile.Stats[1],
        //         dataReg.ArmoryPofile.Stats[3],
        //         dataReg.ArmoryPofile.Stats[2],
        //         dataReg.ArmoryPofile.Stats[4],
        //         dataReg.ArmoryPofile.Stats[5],
        //         dataReg.ArmoryPofile.Stats[6],
        //         dataReg.ArmoryPofile.Stats[7],
        //     ],
        //     equip:[
                
        //     ],
        //     engrav:[],
        //     gems:[], 
        // }
    }else{
        console.log('\'../components/findData.js\' Error occured!');
    }
    
};

module.exports = research;