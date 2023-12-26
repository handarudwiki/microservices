const express = require('express');
const router = express.Router();
require('dotenv').config()
const apiAdapter = require('./apiAdapter')
const jwt = require('jsonwebtoken');
const verifyTioken = require('../middleware/verifyTioken');

const api = apiAdapter(process.env.URL_SERVICE_USER)

router.put('/', verifyTioken, async (req, res)=>{
    try {
        const id = req.user.data.data.id;
        const user = await api.put(`/users/${id}`, req.body)
        const data = user.data
        return res.status(200).json(data)
    }catch(error){
        return res.status(error.response.status).json(error.response.data);
    }
})
router.get('/', verifyTioken, async (req, res)=>{
    try {
        const id = req.user.data.data.id
        const user = await api.get(`/users/${id}`)
        const data = user.data
        return res.status(200).json(data)
    }catch(error){
        console.log(error.response.status)
        return res.status(error.response.status).json(error.response.data);
    }
})


module.exports = router