const router = require('express').Router();
let Ingredient = require('../models/ingredient.model');
var logger = require('log4js').getLogger();

// const Exersise = []

router.route('/').get((req, res) => {
  Ingredient.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const type = req.body.type;
  const kCal = Number(req.body.kCal);

  const newIngredient = new Ingredient({
    name,
    type,
    kCal,
  });

  logger.debug("Trying to add: \n" + newIngredient);

  newIngredient.save()
  .then(() => res.json('Ingredient added!'))
  .catch((err) => {
    logger.debug(err);
    res.status(400).json('Error: ' + err);
  });
});

router.route('/:id').get((req, res) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => res.json(ingredient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Ingredient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Ingredient.findById(req.params.id)
    .then(ingredient => {
      ingredient.name = req.body.name;
      ingredient.type = req.body.type;
      ingredient.kCal = Number(req.body.kCal);

      ingredient.save()
        .then(() => res.json('Ingredient updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
