const router = require('express').Router();
let Food = require('../models/food.model');
var logger = require('log4js').getLogger();

const Foods = []

// router.route('/').get((req, res) => {

// })

router.route('/').post((req, res) => {
  logger.debug(req.body);

  const name = req.body.name;
  const desc = req.body.desc;
  const kCal = Number(req.body.kCal);

  const newFood = new Food({
    name,
    desc,
    kCal,
  });

  logger.debug("Trying to add: \n" + newFood);

  newFood.save()
  .then(() => res.json('Food added!'))
  .catch((err) => {
    logger.debug(err);
    res.status(400).json('Error: ' + err);
  });
});

router.route('/:id').get((req, res) => {
  Food.findById(req.params.id)
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  Food.findById(req.params.id)
    .then(food => {
      food.name = req.body.name;
      food.desc = req.body.desc;
      food.kCal = Number(req.body.kCal);

      food.save()
        .then(() => res.json(food))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json('Food deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
