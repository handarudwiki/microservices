const express = require('express');
const router = express.Router();
require('dotenv').config()
const apiAdapter = require('./apiAdapter')
const verifyTioken = require('../middleware/verifyTioken');
const can = require('../middleware/permission')

const {HOSTNAME} = process.env

const api = apiAdapter(process.env.URL_SERVICE_COURSE)
router.get('/', async(req, res) =>{
    try {
        // return res.json("kuntul ai")
        const courses = await api.get('/courses',{
            params : {
                ...req.query,
                status : "published"
            }
        })
         const courseData = courses.data
        //  return res.json(courseData)
         const firstPage = courseData.data.first_page_url.split('?').pop();
         const lastPage = courseData.data.last_page_url.split('?').pop();
         courseData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`
         courseData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`

         if(courseData.data.next_page_url){
            const nextPage = courseData.data.next_page_url.split("?").pop();
            courseData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`
         }

         if(courseData.data.prev_page_url){
            const prevPage = courseData.data.prev_page_url.split('?').pop();
            courseData.data.prev_page_url = `${HOSTNAME}/courses?${prevPage}`
         }

         courseData.data.path = `${HOSTNAME}/courses`

        return res.status(200).json(courseData)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.get("/:id", async (req,res)=>{
    try {
        const course = await api.get(`/courses/${req.params.id}`)
        return res.status(200).json(course.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.post("/", verifyTioken,can('admin'), async(req, res)=>{
    try {
        const course = await api.post("/courses", req.body)
        return res.status(200).json(course.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.put("/:id", verifyTioken,can('admin'), async(req, res)=>{
    try {
        const course = await api.put(`/courses/${req.params.id}`, req.body)
        return res.status(200).json(course.data)
    } catch (error) {
        return res.status(error.response.status).json(error.response.data)
    }
})

router.delete("/:id", verifyTioken, can("admin"),async (req, res) => {
    try {
        const response = await api.delete(`/courses/${req.params.id}`);
        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
});


module.exports = router