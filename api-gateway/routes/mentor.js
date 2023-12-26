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

router.get('/', async (req, res) => {
    const mentor =  await axios.get('http://localhost:8000/api/mentors');
    return res.json(mentor.data);
})

router.put('/:id', async(req, res) =>{
    try {
        const mentor = api.put(`/mentors/${req.params.id}`,req.body);
        return res.status(200).json(mentor.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete('/:id', async(req, res) => {
    try {
       const message = api.delete(`/menotrs/${req.params.id}`);
       return res.status(200).json(message.data);
    } catch (error) {
       return res.status(error.response.status).json(error.response.data) 
    }
})

module.exports = router;