const express = require('express')
const apiAdapter = require('./apiAdapter')
const router = express.Router()
require('dotenv').config()

const {URL_SERVICE_COURSE} = process.env

const api = apiAdapter(URL_SERVICE_COURSE)

router.post('/', async(req, res)=>{
    try {
        const userId = req.user.data.id
        const review = await api.post("/reviews", {
            user_id : userId,
            ...req.body
        })   

        return res.status(200).json(review.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.put('/:id', async(req, res)=>{
    try {
        // return res.json(`/reviews/${req.params.id}`)
      const userId = req.user.data.id
      const review = await api.put(`/reviews/${req.params.id}`, {
        user_id :userId.Router,
        ...req.body
      })  

      return res.status(200).json(review.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete("/:id", async(req, res)=>{
    try {
        const response = await api.delete(`/reviews/${req.params.id}`)
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

module.exports = router