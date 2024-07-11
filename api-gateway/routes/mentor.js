const express = require('express');
const apiAdapter = require('./apiAdapter');
const { default: axios } = require('axios');
const router = express.Router();
require('dotenv').config();

const api = apiAdapter(process.env.URL_SERVICE_COURSE)

router.post('/',async (req, res) => {
    try {
      const mentor = await api.post('/mentors',req.body);
      return res.status(200).json(mentor.data);
    } catch (error) {
        console.log(error);
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get('/',async (req, res) => {
    try {
        const mentor =  await api.get('mentors');
        return res.status(200).json(mentor.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get("/:id", async (req,res)=>{
    try {
        const id = req.params.id

        const mentor = await api.get(`/mentors/${id}`);

        return res.status(200).json(mentor.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.put("/:id",  async(req, res)=>{
    try {
        // return res.json("kuntul ai")
        const course = await api.put(`/mentors/${req.params.id}`, req.body)
        return res.status(200).json(course.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete("/:id",  async (req, res) => {
    try {
        const response = await api.delete(`/mentors/${req.params.id}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
});

module.exports = router;