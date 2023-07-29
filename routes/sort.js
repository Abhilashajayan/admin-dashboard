const express = require("express");
const router = express.Router();
const User = require("../model/signupSchema");

router.get("/", async (req, res) => {
    try {
        console.log("Before User.find()"); 
        const userData = await User.find({}).sort({ username: 1 });
        console.log(userData);
      res.render("admins", { userData });
    } catch (error) {
      console.error("Error fetching sorted data:", error);
      res.status(500).send("Error fetching sorted data");
    }
  });


  module.exports = router;