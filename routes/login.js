var express = require("express");
const router = express.Router();
const User =  require("../model/signupSchema");
const { log } = require("console");


router.get('/',function(req, res, next){
    res.render('login');
});

router.post('/',async(req , res)=>{
    // const {username, password} = req.body;
    try{
    console.log("checking for the loggin");
    const {logname, logpassword} =req.body;
    console.log(logname);
    console.log(logpassword);
    const user = await User.findOne({email:logname});
    console.log(user.username);
    if(logname === user.email && logpassword === user.password){
        req.session.loggedIn = true;
        req.session.username = user.username;
        req.session.userval = true;
        res.redirect('/home');

    } else {
        const error = 'Invalid username or password';
        res.render('login', { error });
      }
    
    }catch(error){
        console.error('Error during login:');
        // const errorMessage = 'Failed to authenticate user';
        // res.render('login', { error: errorMessage });
    }
  });

module.exports = router;