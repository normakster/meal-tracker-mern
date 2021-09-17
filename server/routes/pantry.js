const router = require('express').Router();
const logger = require('log4js').getLogger();
const { Inventory } = require('../models/inventory.model');

router.route('/').get((req, res, next) => {
  Inventory.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req,res,next) => {
  Inventory.findOne().byFoodID(req.body.food._id).exec(function (err, existing) {
    if(existing) {
      existing.quantity += Number(req.body.quantity);
      existing.save()
        .then((item) => res.json(item))
        .catch((err) => {
          logger.debug(err);
          res.status(400).json('Error: ' + err);
        });
    }
    else {
      const newItem = new Inventory({
        quantity: Number(req.body.quantity) || 0,
        food: req.body.food
      });
      logger.debug('Trying to add Item: \n' + JSON.stringify(''));
      newItem.save()
        .then((item) => res.json(item))
        .catch((err) => {
          logger.debug(err);
          res.status(400).json('Error: ' + err);
        });
    }
  });
});

router.route('/:id').put((req, res, next) => {
  if(Number(req.body.quantity) === 0) {
    Inventory.findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
  } else {
    Inventory.findById(req.params.id)
      .then(item => {
        item.quantity = Number(req.body.quantity);
        item.food = req.body.food;
        item.save()
          .then(() => res.json(item))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/:id').delete((req, res, next) => {
  const { id } =req.params;
  Inventory.findByIdAndDelete(id)
    .then(() => res.json({ deleted: id }))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res, next) => {
  Inventory.findById(req.params.id)
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
