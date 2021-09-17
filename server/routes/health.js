const router = require('express').Router();
const logger = require('log4js').getLogger();
const settings = require('../config/settings');

router.route('/').get((req, res, next) => {
  res.status(200).json(
    {
      msg:'Health Check '+settings.api.api_version,
      host: settings.server.host,
      port: settings.server.port,
      mongoDBName: settings.mongo.mongoDBName,
    })
});

module.exports = router;
