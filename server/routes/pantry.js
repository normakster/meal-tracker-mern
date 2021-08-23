const router = require('express').Router();
const logger = require('log4js').getLogger();
const { Inventory } = require('../models/inventory.model');

router.route('/').get((req, res, next) => {
  Inventory.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req,res,next) => {
  const newItem = new Item({
    //
  });
  logger.debug('Trying to add Item: \n' + JSON.stringify(''));
  newItem.save()
    .then((item) => res.json(item))
    .catch((err) => {
      logger.debug(err);
      res.status(400).json('Error: ' + err);
    });
});

router.route('/:id').put((req, res, next) => {
  const { id } =req.params;
  Inventory.findById(id)
    .then(item => {
      for(const key of Object.keys(item)) {
        item[key] = (req.body)[key];
      }
      item.save()
        .then(() => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
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
