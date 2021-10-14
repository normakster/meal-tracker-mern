const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const settings = require('./config/settings');

// Configure Logger
const log4js = require('log4js')
const { traceLogConfig } = settings.log4js;
log4js.configure(traceLogConfig);
var logger = log4js.getLogger("app");

// Setting up database
const { mongo } = settings;
mongoose.connect(mongo.mongoURL + '/' + mongo.mongoDBName, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
// useFindAndModify: false,
// useUnifiedTopology: true,
const connection = mongoose.connection;
connection.once('open', () => {
  logger.info("MongoDB database connection established successfully");
});

// Create Express application
const { port, host } = settings.server;
const app = express();

// View engine

// Install Middleware
// app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
const corsOptions = {
  origin: [
    `https://nutri.${host}`,
    `http://nutri.${host}`,
    `https://nutri.localhost`,
    `http://nutri.localhost`,
    `https://${host}`,
    `http://${host}`,
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204
}
app.use(cors(corsOptions));
app.use(express.json());

// Path routing
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const mealsRouter = require('./routes/meals');
const newMealsRouter = require('./routes/newMeals');
const pantryRouter = require('./routes/pantry');
const fdaFoodsRouter = require('./routes/fdaFoods');
const upcFoodsRouter = require('./routes/upc');
app.use('/api/users', usersRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/mealsOld', mealsRouter);
app.use('/api/meals', newMealsRouter);
app.use('/api/pantry', pantryRouter);
app.use('/api/fda', fdaFoodsRouter);
app.use('/api/upc', upcFoodsRouter);

const healthRouter = require('./routes/health');
app.use('/api/health', healthRouter);

// -----------------------------------------------------

// Set up server
app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
