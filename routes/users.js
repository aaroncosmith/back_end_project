const express = require('express'),
  router = express.Router(),
  bcrypt = require('bcryptjs')
usersModel = require('../models/usersModel')


router.get('/login', function (req, res, next) {
  res.render('template', {
    locals: {
      title: 'Sign In',
      is_logged_in: req.session.is_logged_in
    },
    partials: {
      partial: 'partial-login'
    }
  });
});

router.get('/signup', (req, res) => {
  res.render('template', {
    locals: {
      title: 'Sign Up',
      is_logged_in:req.session.is_logged_in
    },
    partials:{
      partial: 'partial-signup'
    }
  });
});

router.post('/signup', async (req, res) => {
  const {name, email} = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const user = new usersModel(null, name, email, hash);
  user.save().then(() => {
    res.redirect('/');
  });
});
  



router.post('/login', (req, res) => {
  const user = new usersModel(null, null, req.body.email, req.body.password);
  user.userLogin().then(response => {
  console.log('Login Status: ', response);
  })
  if(response.isValid === true) {
    req.session.is_logged_in = true;
    req.session.name = response.name;
    req.session.email = response.email;
    req.session.password = response.password;
    res.redirect('/')
  } else {
    res.sendStatus(401);
    res.redirect()
  }
});


router.get('/logout', (req,res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
