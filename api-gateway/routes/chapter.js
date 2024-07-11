const apiAdapter = require('./apiAdapter')
const express = require('express')
const { route } = require('./media')
const router = express.Router()

require('dotenv').config()
const {URL_SERVICE_COURSE} = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

router.get("/", async(req, res)=>{
    try {
        const chapters = await api.get("/chapters", {
            params : {
                ...req.query
            }
        });
        return res.status(200).json(chapters.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get("/:id", async(req, res)=>{
    try {
        const chapter = await api.get(`/chapters/${req.params.id}`)
        return res.status(200).json(chapter.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.post('/', async(req, res)=>{
    try {
        const chapter = await api.post("/chapters", req.body)
        return res.status(200).json(chapter.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.put("/:id", async (req, res)=>{
    try {
        const chapter = await api.put(`/chapters/${req.params.id}`, req.body)
        return res.status(200).json(chapter.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete("/:id", async(req, res)=>{
    try {
        const response = await api.delete(`/chapters/${req.params.id}`)
        return res.status(200).json(response.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

module.exports = router

