const express = require('express');
const apiAdapter = require('./apiAdapter');
const router = express.Router();
require('dotenv').config()

const {URL_SERVICE_ORDER_PAYMENT} = process.env

const api = apiAdapter(URL_SERVICE_ORDER_PAYMENT)

router.post('/', async (req,res)=>{
    try {
        const order = await api.post('/orders',req.body);
        return res.status(200).json(order.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
})

module.exports = router