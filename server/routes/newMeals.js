const router = require('express').Router();
const mealData = require('../models/meal.new.model');
const Meal = mealData.Meal;
const logger = require('log4js').getLogger();


router.route('/').post((req,res,next) => {
  // Validate
  const valid = mealData.validate(req.body);
  // Confirm Unique
  const meal = new Meal(valid);
  meal.save()
  .then((found) => res.status(200).json(
    {
      _id:found._id,
      msg:'Created: '+found._id,
      data:found
    }))
  .catch(err => {
    logger.debug(err);
    res.status(400).json( {msg: 'Error: ' + err,} );
  });
})
router.route('/:id').get((req, res, next) => {
})
router.route('/:id').put((req, res, next) => {
})
router.route('/:id').delete((req, res, next) => {
})
router.route('/').get((req, res, next) => {
  Meal.find()
    .then(meals => res.json(meals))
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router;
