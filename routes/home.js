const express = require("express");
const router = express.Router();

router.get("/",(req , res, next)=>{
    res.render('home');
    if (req.session.loggedIn) {
        res.send('Welcome to the home page!');
      } else {
        res.redirect('/login');
      }
});

module.exports =router;