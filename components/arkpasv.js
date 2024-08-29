const axiosApi = require('./axiosApi');

async function arkpasv(usr){
    try{
        const inst = await axiosApi(`/armories/characters/${usr}/arkpassive`);
        const res = await inst.get();
        return res.status === 200 ? await res.data : undefined;

    }catch(err){
        console.log(err);
    }
}

module.exports = arkpasv;