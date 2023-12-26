const express = require('express');
const router = express.Router();
const isBase64 = require('is-base64');
const base64 = require('base64-img');
const Media = require('../models/Media');

/* GET users listing. */
const{unlink} = require('fs');

router.post('/', async (req, res) => {
  // test()
  // // Media.create({'image' : 'bakso'})
  // return res.json('ok')
  try {
    if (!isBase64(req.body.image, { mimeRequired: true })) {
      return res.status(400).json({
        'status': 'error',
        'message': 'Harus base64 decoding'
      });
    }

    base64.img(req.body.image,'./public/images', Date.now(), async(err, filePath) => {
      if(err){
        return res.status(400).json({
          status : 'error',
          message : err.message
        })
      }

      const filename = filePath.split('\\')[2];
      const media = await Media.create({image: `images/${filename}`});

      return res.status(200).json({
        status : 'success',
        data : `${req.get('host')}/${media.image}`
      })
    })


  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    });
  }
});

router.get('/',  async(req, res)=>{
  try {
    const media = await Media.findAll({
      attributes:['id','image']
    })
    const mappedMedia = media.map((i)=>{
      i.image = `${req.get('host')}/images/${i.image}`;
      return i
    })

    return res.status(200).json({
      status : 'success',
      data : mappedMedia
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'something went wrong'
    })
  }
})

router.delete('/:id', async(req, res)=>{
  try {
    const id = parseInt(req.params.id)
    const media = await Media.findByPk(id)
    if(!media){
      return res.status(404).json({
        status : 'error',
        message : 'Media not found'
      })
    }

    unlink(`./public/${media.image}`, async(err) => {
      if (err) {
        return res.status(400).json({
          status : 'error',
          message : err.message
        })
      }
      await media.destroy()
      return res.status(200).json({
        status : 'success',
        message : 'media deleted successfully'
      })
    });
  } catch (error) {
    return res.status(500).json({
      status : 'error',
      message : 'something went wrong'
    })
  }
});


module.exports = router;
