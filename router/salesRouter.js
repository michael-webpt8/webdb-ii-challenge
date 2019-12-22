const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');

/**
 * CONSTANTS to help keep errors from creeping into retyping the same thing over and over again in strings.
 */
const SOLD = 'sold';
const SOLD_TO = 'sold_to';
const SOLD_BY = 'sold_by';
const LIST_PRICE = 'list_price';
const SOLD_PRICE = 'sold_price';

const router = express.Router();

/**
 * GET
 * Endpoint   : `/cars/:id/sales`
 * description: get sales data off where id matches
 */
router.get('/:id/sales', async (req, res, next) => {
  try {
    res.json(
      await db('sales').select(
        'sales_id', // just sticking in right now for testing.
        { sold: SOLD }, // `SOLD as sold`
        { Seller: SOLD_BY }, // `sold_by as Seller`
        { Purchaser: SOLD_TO }, // `sold_to as Buyer`
        { ListingPrice: LIST_PRICE }, // `list_price as ListingPrice`
        { PriceSoldAt: SOLD_PRICE } // `sold_price as PriceSoldAt`
      )
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
      sold: req.body.sold,
      sold_to: req.body.sold_to,
      sold_by: req.body.sold_by,
      list_price: req.body.list_price || null,
      sold_price: req.body.sold_price || null,
    };

    const [id] = await db('sales')
      .where({ sales_id: req.params.sales_id })
      .insert(payload);
    res.status(201).json(
      await db('sales')
        .where({ sales_id: id })
        .select(SOLD, SOLD_TO, SOLD_BY, LIST_PRICE, SOLD_PRICE)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

router.put('/:salesId/sales', async (req, res, next) => {
  try {
    const updatePayload = {
      sold: req.body.sold, // i think sold should be a must on update.
      sold_by: req.body.sold_by || null,
      sold_to: req.body.sold_to || null,
      list_price: req.body.list_price, // is required NOT NULL CONSTRAINT.
      sold_price: req.body.sold_price || null,
    };
    await db('sales')
      .where({ sales_id: req.params.salesId })
      .update(updatePayload);
    res.json(
      await db('sales')
        .where({ sales_id: req.params.id })
        .select(SOLD, SOLD_TO, SOLD_BY, LIST_PRICE, SOLD_PRICE)
        .first()
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
