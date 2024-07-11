const express = require('express')
const apiAdapter = require('./apiAdapter')
const router = express.Router()
require('dotenv').config()

const {URL_SERVICE_COURSE} = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

router.post('/', async(req, res)=>{
    try {
        // return res.json(req.user)
        const userId = req.user.data.id
       const myCourse = await api.post("/my-courses", {
        user_id : userId,
        ...req.body
       })
       return res.status(200).json(myCourse.data) 
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get('/', async(req, res)=>{
    try {
        const id = req.user.data.id
        const myCourse = await api.get(`/my-courses`, {
            params : {user_id : id}
        })

        return res.status(200).json(myCourse.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

module.exports = router

