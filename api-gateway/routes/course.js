const express = require('express');
const router = express.Router();
require('dotenv').config()
const apiAdapter = require('./apiAdapter')
const jwt = require('jsonwebtoken');
const verifyTioken = require('../middleware/verifyTioken');

router.get('/', verifyTioken, (req, res) =>{
    return res.json(req.user)
})

module.exports = router