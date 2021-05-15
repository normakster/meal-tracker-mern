const router = require('express').Router();
const { Food } = require('../models/food.model');
const logger = require('log4js').getLogger();

const Foods = []

// router.route('/').get((req, res) => {

// })

router.route('/').post((req, res) => {
  logger.debug(req.body);


  const newFood = new Food({
    name: req.body.name,
    desc: req.body.desc,
    kCal:Number(req.body.kCal),
    fat: Number(req.body.fat),
    protien: Number(req.body.protien),
    carb: Number(req.body.carb)
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
      food.fat = Number(req.body.fat);
      food.protien = Number(req.body.protien);
      food.carb = Number(req.body.carb);

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
