const router = require('express').Router();
const foodData = require('../models/newFood.model');
const logger = require('log4js').getLogger();
const Food = foodData.Food;

router.route('/search').post((req, res, next) => {
  let searchOptions = {
    query: req.body.query || '',
  }
  Food.findOne().byQuery(searchOptions.query)
  .then( async (food) => {
    if(food) {
      logger.debug('Found ' + food.description + ' from the DB for fcdId: ' + food._id );
      res.status(200).json({totalHits:1,foods:[food]});
    } else {
      res.status(204).json({foods: foodData.empty()});
    }
  })
  .catch(err => {
    logger.debug('Error: '  + err);
    res.status(400).json({foods:[]})
  });
})

router.route('/').post((req, res, next) => {
  const validated = foodData.make(req.body);
  const newFood = new Food(validated);
  newFood.save()
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
});
router.route('/:id').get((req, res, next) => {
  Food.findById(req.params.id)
    .then(food => res.status(200).json(
      {
        _id:found._id,
        msg:'Found: '+found._id,
        data:found
      }))
    .catch(err => res.status(400).json( {msg: 'Error: ' + err,} ));
});
router.route('/:id').put((req, res, next) => {
  Food.findById(req.params.id)
    .then(found => {
      found = foodData.update(found,req.body);
      found.save()
        .then(() => res.status(200).json(
          {
            _id:found._id,
            msg:'Updated: '+found._id,
            data:found
          }))
        .catch(err => res.status(400).json( {msg: 'Error: ' + err,} ));
    })
    .catch(err => res.status(400).json( {msg: 'Error: ' + err,} ));
});
router.route('/:id').delete((req, res, next) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(
      {
        _id: req.params.id,
        msg: 'Food deleted.',
        data: foodData.empty(),
      }
    ))
    .catch(err => res.status(400).json( {msg: 'Error: ' + err,} ));
});
router.route('/').get((req, res, next) => {
  Food.find()
    .then(data => {
      (data.length === 0) ? data = [foodData.empty()] : data;
      res.json(
        {
          msg:'Fetched.',
          data:data
        })
      })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
