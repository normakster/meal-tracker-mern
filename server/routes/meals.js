const router = require('express').Router();
const { Meal } = require('../models/meal.model');
const logger = require('log4js').getLogger();

router.route('/').post((req,res,next) => {
  const meal = new Meal({
    date: req.body.date,
    time: req.body.time,
    datetime: req.body.datetime,
    location: req.body.location,
    // ingredients: sentIngredients
    ingredients: req.body.ingredients.map((item) => {
      return {
        serv: item.serv,
        food: { ...item.food }
      }
    })
  });
  logger.debug('Trying to add Meal: \n' + JSON.stringify(meal));
  meal.save()
    .then((meal) => res.json(meal))
    .catch((err) => {
      logger.debug(err);
      res.status(400).json('Error: ' + err);
    })
})

router.route('/:id').get((req, res, next) => {
  Meal.findById(req.params.id)
    .then(meal => res.json(meal))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').put((req, res, next) => {
  Meal.findById(req.params.id)
    .then(meal => {
      meal.date = req.body.date,
      meal.time = req.body.time,
      meal.datetime = req.body.datetime,
      meal.location = req.body.location,
      meal.ingredients = req.body.ingredients.map((item) => {
        return {
          serv: item.serv,
          food: { ...item.food }
        }
      })
      meal.save()
        .then(() => res.json(meal))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/').get((req, res, next) => {
  Meal.find()
    .then(meals => res.json(meals))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res, next) => {
  Meal.findByIdAndDelete(req.params.id)
    .then(() => res.json('Meal deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
