const router = require('express').Router();
const foodData = require('../models/food.model');
const logger = require('log4js').getLogger();
const Food = foodData.Food;


router.route('/').post((req, res, next) => {
  logger.debug(req.body);
  const newFood = new Food(foodData(req.body));


  logger.debug("Trying to add: " + newFood);

  newFood.save()
  .then(() => res.json('Food added!'))
  .catch((err) => {
    logger.debug(err);
    res.status(400).json('Error: ' + err);
  });
});

router.route('/:id').get((req, res, next) => {
  Food.findById(req.params.id)
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res, next) => {
  Food.findById(req.params.id)
    .then(food => {
      food = foodData.update(food,req.body);

      food.save()
        .then(() => res.json(food))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res, next) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json('Food deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res, next) => {
  Food.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
