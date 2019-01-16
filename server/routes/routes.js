const express = require('express');

const router = express.Router();

const passport = require('passport');


router.get('/', (req,res) => {
  res.render('index');
});

router.get('/signup', (req,res)=> {
  res.render('index');
})

router.get('/login', (req,res)=> {
  res.render('index');
})

router.get('/todo', (req,res) => {
  res.render('index')
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));



router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login'}),
  (req, res) => {
    console.log(req.user);
    // var token = req.user.token;
    res.status(200).redirect('/');
  });



module.exports = router;