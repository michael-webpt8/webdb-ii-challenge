const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');

const router = express.Router();

/**
 * GET
 * ENDPOINT: `/cars`
 * Description: Read end point for
 * SELECT * FROM `cars`;
 */
router.get('/', async (req, res) => {
  try {
    const cars = await db('cars').select();
    res.json(cars);
  } catch (err) {
    next(err);
  }
});

/**
 * POST
 * Endpoint: `/cars`
 * Description: Create rest endpoint for cars with
 * INSERT INTO `cars` req.body WHERE id = 'ids';
 * SELECT * FROM `cars` WHERE id = (promise id) LIMIT 1;
 */
router.post('/', async (req, res, next) => {
  try {
    const ids = await db('cars').insert(req.body);
    const newCar = await db('cars')
      .where({ id: ids[0] })
      .first();

    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
});

/**
 * UPDATE
 * Endpoint: `/cars/:id`
 * description: update car item
 * INSERT INTO `cars` (value...name) VALUES (...value...names);
 * SELECT * FROM `cars` WHERE id = (promise id) LIMIT 1;
 */
router.put('/:id', async (req, res, next) => {
  try {
    const carId = await db('cars').insert(req.body);
    const newCar = await db('cars')
      .where({ id: carId[0] })
      .first();

    res.json(201).json(newCar);
  } catch (err) {
    next(err);
  }
});

//  const carId = await db('cars')
//    .where({ id: req.params.id })
//    .del();

module.exports = router;
