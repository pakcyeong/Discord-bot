const axiosApi = require('./axiosApi');
const regexp = require('./regexp');

async function arkpasv(usr){
    try{
        const inst = await axiosApi(`/armories/characters/${usr}/arkpassive`);
        const res = await inst.get();
        // const data = JSON.stringify(res);
        console.log(res.data);
        // console.log(data);
        return res.status === 200 ? await res.data : undefined;

    }catch(err){
        console.log(err);
    }
}

module.exports = arkpasv;