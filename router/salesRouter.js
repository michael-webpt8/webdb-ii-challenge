const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');

const SOLD = 'sold';
const SOLD_TO = 'sold_to';
const SOLD_BY = 'sold_by';
const LIST_PRICE = 'list_price';
const SOLD_PRICE = 'sold_price';

const router = express.Router();

/**
 * GET
 * Endpoint: `/cars/:id/sales`
 * description: get sales data off where id matches
 */
router.get('/:id/sales', async (req, res, next) => {
  try {
    res.json(
      await db('sales')
        .where({ id: req.params.id })
        .select(SOLD, SOLD_TO, SOLD_BY, LIST_PRICE, SOLD_PRICE)
    );
  } catch (err) {
    next(err);
  }
});

/**
 * POST / CREATE
 * Endpoint: `/cars/:id/sales`
 */
router.post('/:id/sales', async (req, res, next) => {
  try {
    const payload = {
      sold: req.body.sold || null,
      sold_to: req.body.sold_to,
      sold_by: req.body.sold_by,
      list_price: req.body.list_price || null,
      sold_price: req.body.sold_price || null
    };

    const [id] = await db('sales')
      .where({ id: req.params.id })
      .insert(payload);
    res.status(201).json(
      await db('sales')
        .where({ id: id })
        .select(SOLD, SOLD_TO, SOLD_BY, LIST_PRICE, SOLD_PRICE)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
