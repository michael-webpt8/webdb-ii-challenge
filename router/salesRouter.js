const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');

const router = express.Router();

router.get('/:id/sales', async (req, res, next) => {
  try {
    res.json(
      await db('sales')
        .where({ id: req.params.id })
        .select('sold', 'sold_to', 'sold_by', 'list_price', 'sold_price')
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
