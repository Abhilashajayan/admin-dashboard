const express = require("express");
const router = express.Router();
const validate = require("../middleware/Validate");
const User = require("../model/signupSchema");

router.get("/",validate, async (req , res)=>{
  let user = req.session.username;
   res.render('home', {user});
   
});

module.exports =router;