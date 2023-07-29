const express = require("express");
const router = express.Router();
const User = require("../model/signupSchema");
const validates = require('../middleware/advalidate');


router.get("/", validates, async (req, res) => {
    try {
      const userData = await User.find({}, { username: 1, email: 1, password: 1, _id: 1 });
      res.render("admins", { userData });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
    }
  });
  


module.exports =router;