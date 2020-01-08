const express = require('express');
const helmet = require('helmet');
const db = require('../utils/db');
const salesRouter = require('../router/salesRouter');

const router = express.Router();

router.use('/', salesRouter);

/**
 * GET
 * ENDPOINT: `/cars`
 * Description: Read end point for
 * SELECT * FROM `cars`;
 */
router.get('/', async (req, res, next) => {
  try {
    const car = await db
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
    res.json(car);
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
      title_status: req.body.title_status || null,
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
router.put('/:id', validateId, async (req, res, next) => {
  try {
    const payload = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      transmission_type: req.body.transmission_type || null,
      title_status: req.body.title_status || null,
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
router.delete('/:id', validateId, async (req, res, next) => {
  try {
    await db('cars')
      .where('id', req.params.id)
      .del();

    res.json(204);
  } catch (err) {
    next(err);
  }
});

async function validateId(req, res, next) {
  try {
    const car = await db('cars')
      .where({ id: req.params.id })
      .first();
    if (car) {
      next();
    } else {
      res.status(404).json({ message: '404 page not found...' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = router;
