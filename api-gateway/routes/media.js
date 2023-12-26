const express = require('express');
const router = express.Router();
require('dotenv').config()
const apiAdapter = require('./apiAdapter')

const api = apiAdapter(process.env.URL_SERVICE_MEDIA)
/* GET home page. */
router.post('/',async (req,res)=>{
  try {
    const media = await api.post('/media', req.body)
    return res.json(media.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

router.get('/', async (req, res)=>{
  try {
    const media = await api.get('/media')
   return res.status(200).json(media.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
})

router.delete('/:id', async (req, res)=>{
  try {
    const id = parseInt(req.params.id)
    const media = await api.delete(`/media/${id}`);
    return res.status(200).json(media.data);
} catch (error) {
    // console.error('Error:', error.response.status);
    return res.status(error.response.status).json(error.response.data);
}
})


module.exports = router;
