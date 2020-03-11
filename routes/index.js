const express = require('express'),
router = express.Router(),
imageModel = require('../models/imageModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const result = await imageModel.renderImage();
  res.render('template', {
    try: {
      title: 'Film Data',
      data: result
    },
    partials: {
      partial: 'partial-index'
    }
  })
});

module.exports = router;
