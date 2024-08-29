const axiosApi = require('./axiosApi');
const regexp = require('./regexp');

async function arkpasv(usr){
    try{
        const inst = await axiosApi(`/armories/characters/${usr}/arkpassive`);
        const res = await inst.get();
        const data = JSON.stringify(res);

        return res.status === 200 ? regexp(data) : undefined;

    }catch(err){
        console.log(err);
    }
}

module.exports = arkpasv;