const express = require("express");
const router = express.Router();
const Admin = require('../model/adminSchema');
const User = require('../model/signupSchema');

// const validate = require("../middleware/Validate");

router.get('/admin',(req,res) => {
    res.render('adminlogin');
});


router.post('/admin',async(req,res) => {
try{
    const { adname , adPassword } = req.body;
    console.log(adname);
    const admin = await Admin.findOne({adminId:adname});
    if(admin.adminId === adname && admin.adminPassword === adPassword) {
    req.session.loggIn = true;
    req.session.AdminName = admin.adminId;
    res.redirect('/dashboard');
    
    }
    console.log("nnot found");
}catch(err){
    console.log(err);
    res.send("this is wrong")
}

});
router.delete('/api/delete/:userID', async (req, res) => {
  try {
    const id = req.params.userID;
    const deletedData = await User.findByIdAndDelete(id);
    
    
    console.log('Deleted data:', deletedData);
    res.redirect('/dashboard');
    req.flash('deletedUser', 'Deleted the user successfully');
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});





module.exports = router;