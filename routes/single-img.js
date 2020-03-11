const express = require('express'),
router = express.Router(),
imageModel = require('../models/imageModel');


/* GET home page. */
router.get('/', async function(req, res, next) {
  const resultData = await renderImage();
  res.render('template', {
    locals: {
      title: 'Film Data',
      resultData: resultData,
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-index'
    }
  })
});

router.get('/:picture?', async (req,res) => {
    const pictureId = req.params.picture
    const pictureData = await imageModel.getById(pictureId);
    
    console.log(pictureData);
    
      res.render('template', {
        locals: {
          title:'Hello',
          pictureData: pictureData,
          is_logged_in:req.session.is_logged_in
        },
        partials: {
          partial: 'partial-single-img'
        }
      });
    })

module.exports = router;