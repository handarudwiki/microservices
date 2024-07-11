const express = require("express")
const apiAdapter = require("./apiAdapter")
const router = express.Router()
require('dotenv').config()
const {URL_SERVICE_COURSE} = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

router.post('/', async(req, res)=>{
    try {
        const imageCourse = await api.post("/image-courses", req.body)
        return res.status(200).json(imageCourse.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete('/:id',  async(req, res)=>{
    try {
        const response = await api.delete(`/image-courses/${req.params.id}`)
        return res.status(200).json(response.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})


module.exports = router