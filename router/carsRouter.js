const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cars = await db('cars').select();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
