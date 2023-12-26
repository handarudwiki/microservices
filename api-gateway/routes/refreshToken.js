const express = require('express');
const router = express.Router();
require('dotenv').config()
const apiAdapter = require('./apiAdapter')
const jwt = require('jsonwebtoken')

const {
    JWT_SECRET_REFRESH_TOKEN,
    JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRED,
    URL_SERVICE_USER
} = process.env

const api = apiAdapter(URL_SERVICE_USER)

router.post('/',async (req, res) => {
    try {
        const refreshToken = req.body.refresh_token
        const email = req.body.email

        if(!refreshToken || !email) {
            return res.status(400).json({
                status : 'error',
                message : 'Invalid refresh token'
            })
        }

        await api.get('/refresh-token', {params : {refresh_token: refreshToken}})
        // return res.json({refreshToken, JWT_SECRET_REFRESH_TOKEN})
        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded)=>{
            if(err){
                return res.status(403).json({
                    status : 'error',
                    message : err.message
                })
            }

            // return res.json(decoded.data)
            if(email !== decoded.data.email){
                return res.status(400).json({
                    status : 'error',
                    message : 'invalid Email'
                })
            } 

            
            const token = jwt.sign({data : decoded}, JWT_SECRET, {expiresIn : JWT_ACCESS_TOKEN_EXPIRED})
            return res.status(200).json({
                status : 'success',
                token : token
              })
        })


    } catch (error) {
        return res.status(500).json({
            status : 'error',
            message : error.message
        })
    }
})

module.exports = router
