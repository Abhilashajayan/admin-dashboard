const express = require("express");
const router = express.Router();
const User = require('../model/signupSchema');


router.get('/api/users/:userID', async (req, res) => {
    const userId = req.params.userID;
    
    console.log(userId);
    try {
      const user = await User.findById(userId).exec();
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      res.json(user);
    } catch (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    

  router.put('/api/users/update/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { username, email, password } = req.body;
    
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
  
      if (updatedUser) {
        req.flash('successMsg', 'User data updated successfully!');
        res.json({ success: true, user: updatedUser });
        return;
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });
  

module.exports = router;
