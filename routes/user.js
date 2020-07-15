const express = require("express");

const router = express.Router();

// GET method  @desc REGISTER
router.get("/register", (req, res) => {
  res.render("register");
});

// GET method  @desc REGISTER
router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
