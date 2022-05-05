const router = require('express').Router();
const { Location} = require('../../models');

// The `/api/locations` endpoint

router.get('/', (req, res) => {
  // find all locations
  //try {
  //  const locationData = await Location.findAll();
  //  res.status(200).json(locationData);
  //} catch (err) {
  //  res.status(500).json(err);
  //}
  Location.findAll().then((err,res)=>{
    if (err) {
      throw err
    } else {
      res.status(200).json(locationData);
    }
  })
});

router.get('/:id', (req, res) => {
  // find one location by its `id` value
  try {
    const locationData = await Location.findByPk(req.params.id);
    if (!locationData) {
      res.status(404).json({ message: 'No Location found with that id!' });
      return;
    }
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new location
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a location by its `id` value
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!locationData) {
      res.status(404).json({ message: 'No location found with that id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
