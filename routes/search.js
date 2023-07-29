const express = require("express");
const router = express.Router();
const User = require("../model/signupSchema");

router.get('/search-results', async (req, res) => {
    try {
      const query = req.query.query;
      const searchData = await User.find({ username: { $regex: query, $options: 'i' } });
      console.log(searchData);
      res.render('searchResults', { searchData });
    } catch (error) {
      console.error('Error fetching search results:', error);
      res.status(500).send('Error fetching search results');
    }
  });

  module.exports = router;