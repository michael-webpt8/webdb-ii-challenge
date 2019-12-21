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
    const cars = await db
      .select(
        'id',
        'vin',
        'make',
        'model',
        'mileage',
        'transmission_type',
        'title_status'
      )
      .from('cars');
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
    // const [ids] = await db('cars').insert(req.body);
    const ids = await db('cars').insert({
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission_type: req.body.transmission_type || null,
      title_status: req.body.title_status || null
    });
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
    const payload = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission_type: req.body.transmission_type || null,
      title_status: req.body.title_status || null
    };

    await db('cars')
      .where({ id: req.params.id })
      .update(payload);

    res.status(201).json(
      await db('cars')
        .where({ id: req.params.id })
        .first()

      // WHY DOESNT THIS DESTRUCTURE WORK?
      // const [carId] = await db('cars') <-- carId destructure into line 94.
      //   .where( id: req.params.id )
      //   .update(payload);

      // res.status(201).json(
      //   await db('cars')
      //     .where('id', carId)
      //     .first()
    );
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE
 * Endpoint: `/cars/:id`
 * description: delete selected item from cars
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await db('cars')
      .where('id', req.params.id)
      .del();

    res.json(204);
  } catch (err) {
    next(err);
  }
});

//  const carId = await db('cars')
//    .where({ id: req.params.id })
//    .del();

module.exports = router;
