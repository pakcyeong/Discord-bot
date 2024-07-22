const axios = require('axios');

function axiosApi(url){
    const instance = axios.create({
        baseURL: `${LOSTARK_API_URL}${url}`,
        headers: {
            Accept:'application/json',
            Authorization: `Bearer ${LOSTARK_API_KEY}`
        }
    });
    return instance;
}

module.exports = axiosApi;
    
    
