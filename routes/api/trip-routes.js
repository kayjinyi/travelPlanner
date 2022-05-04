const router = require('express').Router();
const { Trip, Traveller, Location } = require('../../models');

router.get('/', (req, res) => {
  // find all trips
  // be sure to include its associated Traveller and Location data
  try {
    const tripData = await Trip.findAll({
      include: [{ model: Traveller},{ model: Location}],
    });
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one trip
router.get('/:id', (req, res) => {
  // find a single trip by its `id`
  // be sure to include its associated Traveller and Location data
  try {
    const tripData = await Trip.findByPk(req.params.id, {
      include: [{ model: Traveller},{ model: Location}],
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new trip
router.post('/', (req, res) => {
  try {
    const tripData = await Trip.create(req.body);
    res.status(200).json(tripData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update trip

router.delete('/:id', (req, res) => {
  // delete one trip by its `id` value
  try {
    const tripData = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
