const router = require('express').Router();
const { FdaFood } = require('../models/fdaFood.model');
const logger = require('log4js').getLogger();
const fdaApi = require('../api/fda');
const searchResults = {};


router.route('/food/:id').get((req, res, next) => {
  FdaFood.findOne().byFdcID(Number(req.params.id))
    .then(food => res.json(food))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/foods/').get((req, res, next) => {
  FdaFood.find()
    .then(foods => res.json(foods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/foods/search/:fdcId').get((req, res, next) => {

  FdaFood.findOne().byFdcID(Number(req.params.fdcId))
    .then(food => {
      if(food) {
        logger.debug('Found ' + food.description + ' from the DB for fcdId: ' + food.fdcId );
        res.json(food);
      } else {
        logger.debug('Searching the FDA for: ' + req.params.fdcId );
      }
    })
    .catch(err => res.status(400).json({}));
});

router.route('/foods/search/').post((req, res, next) => {
  let searchOptions = {
    query: req.body.query || '',
    dataType: [
      "Branded Foods",
      "Foundation",
      "SR Legacy"
    ],
    pageSize: 25,
    pageNumber: 1,
    sortBy: "dataType.keyword",
    sortOrder: "asc",
    requireAllWords: req.body.requireAllWords || false,
  }

// [TODO]:
// 1. Search local db for all matching && Return results to client.
// 2. If none accepted || none found -> search FDA ('search deeper') && Return results to client.
// 3. If none of FDA accepted || none found -> make new FdaFood && send for manual entry.

  let result;
  FdaFood.findOne().byQuery(req.body.query)
    .then(async (food) => {
      if(food) {
        logger.debug('Found ' + food.description + ' from the DB for fcdId: ' + food.fdcId );
        result = food;
        res.status(200).json({totalHits:1,foods:[food]});
      } else {
        res.status(200).json(emptyFdaFood);
      }
    })
    .catch(err => {
      logger.debug('Error: '  + err);
    });


});

// [TODO]: Send set back for user to choose intended item before asking FDA for additional details.
async function bypass(res,searchOptions) {
  let data = searchResults.many;
  logger.debug('Found ' + data.totalHits + ' from the FDA for: ' + searchOptions.query );
  res.status(200).json({})
}


async function searchQuery(res,searchOptions) {
  await fdaApi.search({...searchOptions})
  .then(data => {
    logger.debug('Found ' + data.totalHits + ' from the FDA for: ' + searchOptions.query );
    res.status(200).json(data)
  })
  .catch(err => {
    logger.debug('Search Error for: ' + searchOptions.query );
    res.status(400).json({});
  });
}

async function searchFcdID(res,id) {
  await fdaApi.byFcdID(id)
  .then(data => {
    logger.debug('Found ' + data.description + ' from the FDA for fcdId: ' + data.fdcId );
    const newFdaFood = makeFdaFood(data);
    newFdaFood.save()
    .then(() => res.json(newFdaFood))
    .catch(err => {
      logger.debug('Save new Food Error: ' + err);
      res.status(400).json({});
    });
  })
  .catch(err => {
    logger.debug('By FcdId Error: ' + err);
    res.status(400).json({});
  });
}

const makeFdaFood = (food) => {
  return new FdaFood({
    fdcId: food.fdcId,
    description: food.description,
    publicationDate: food.publicationDate,
    dataType: food.dataType,
    modifiedDate: food.modifiedDate,
    availableDate: food.availableDate,
    brandOwner: food.brandOwner,
    dataSource: food.dataSource,
    brandedFoodCategory: food.brandedFoodCategory,
    gtinUpc: food.gtinUpc,
    ingredients: food.ingredients,
    marketCountry: food.marketCountry,
    servingSize: food.servingSize,
    servingSizeUnit: food.servingSizeUnit,
    labelNutrients: food.labelNutrients
  })
}

const emptyFdaFood = {
  fdcId: null,
  description: null,
  publicationDate: null,
  dataType: null,
  modifiedDate: null,
  availableDate: null,
  brandOwner: null,
  dataSource: null,
  brandedFoodCategory: null,
  gtinUpc: null,
  ingredients: null,
  marketCountry: null,
  servingSize: null,
  servingSizeUnit: null,
  labelNutrients: null
}

module.exports = router;
