var express = require("express");
var router = express.Router();
const validate = require('../middleware/Validate');
const User = require("../model/signupSchema");

router.get("/register", function(req, res){
    res.render('register');
});
// router.get('/',validate,(req, res)=>{
//     res.render('home',{ name :s});
//   })

router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password,
        });
    
        // Save the user to the database
       await newUser.save();
       res.redirect('/login')
      } catch (error) {
        console.log(error);
        res.render('register')
      }
  });
  router.post('/addUser', async(req, res) => {
    try {
        const { username, email, password } = req.body;
    
        // Create a new user instance
        const newUser = new User({
          username,
          email,
          password,
        });
    
        // Save the user to the database
       await newUser.save();
       req.flash('addedUser', 'Added user successfully!');
       res.redirect('/dashboard')
     
      } catch (error) {
        console.log(error);
      }
  });

module.exports =  router;
