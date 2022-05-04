const router = require('express').Router();
const {Trip, Traveller, Location} = require('../../models');

// The `/api/travellers` endpoint

router.get('/', (req, res) => {
  // find all travellers
  // be sure to include its associated Product data
  try {
    const travellerData = await Traveller.findAll({
      include: [{ model: Trip}, { model: Location}],
    });
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single traveller by its `id`
  // be sure to include its associated Product data
  try {
    const travellerData = await Traveller.findByPk(req.params.id, {
      include: [{ model: Trip}, { model: Location}],
    });

    if (!travellerData) {
      res.status(404).json({ message: 'NoTraveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new traveller
  try {
    const travellerData = await Traveller.create(req.body);
    res.status(200).json(travellerData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete on traveller by its `id` value
  try {
    const travellerData = await Traveller.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!travellerData) {
      res.status(404).json({ message: 'No traveller found with that id!' });
      return;
    }

    res.status(200).json(travellerData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
