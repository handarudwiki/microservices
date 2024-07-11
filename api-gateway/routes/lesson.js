const express = require("express");
const router = express.Router()
const apiAdapter = require ('./apiAdapter');
const { route } = require("./media");
require('dotenv').config()
const {URL_SERVICE_COURSE} = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

router.get('/', async(req, res)=>{
    try {
        const lessons = await api.get('/lessons', {
            params:{
                ...req.query
            }
        })
        return res.status(200).json(lessons.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get('/:id', async(req, res)=>{
    try {
      const lesson = await api.get(`/lessons/${req.params.id}`)
      return res.status(200).json(lesson.data)  
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.post("/", async(req, res)=>{
    try {
        const lesson = await api.post("/lessons", req.body)
        return res.status(200).json(lesson.data)   
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.put("/:id", async(req, res)=>{
    try {
        const lesson = await api.put(`/lessons/${req.params.id}`, req.body)
        return res.status(200).json(lesson.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const response = await api.delete(`/lessons/${req.params.id}`)
        return res.status(200).json(response.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

module.exports = router