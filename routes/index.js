const express = require("express");

const router = express.Router();

// GET method  @desc Homepage
router.get("/", (req, res) => {
  res.render("index");
});

// GET method  @desc dashbaord
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
