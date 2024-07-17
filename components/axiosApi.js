const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

function axiosApi(url){
    const instance = axios.create({
        baseURL: `${process.env.LOSTARK_API_URL}${url}`,
        headers: {
            Accept:'application/json',
            Authorization: `Bearer ${process.env.LOSTARK_API_KEY}`
        }
    });
    return instance;
}

module.exports = axiosApi;
    
    
