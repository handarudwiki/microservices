const apiAdapter = require('../../apiAdapter')

const {URL_SERVICE_MEDIA} = process.env

const api = apiAdapter(URL_SERVICE_MEDIA)

const create = async (req,res)=>{
    try{
        const media = await api.post('/media',req.body)
        return res.status(200).json(media.data)
    } catch(err){
        if(err.code === 'ECONNREFUSED'){
            return res.status(500).json({
                status: 'error',
                message: "server unavailable"
            })
        }
        const {status, data} = err.response;
        return res.status(status).json(data)
    }
}

module.exports = create