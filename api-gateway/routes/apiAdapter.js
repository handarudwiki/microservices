
const axios = require('axios');
require('dotenv').config()

module.exports = (baseUrl)=>{
    return axios.create({
        baseURL: baseUrl,
        timeout : parseInt(process.env.TIMEOUT),
        headers: {
            'Content-Type': 'application/json',
            // tambahkan header lain sesuai kebutuhan
          },
    })
}
 
