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
    `https://${host}`,
    `http://${host}`,
    `${host}`
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // enable set cookie
}
app.use(cors(corsOptions));
app.use(express.json());

// Path routing
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const mealsRouter = require('./routes/meals');
app.use('/api/users', usersRouter);
app.use('/api/foods', foodsRouter);
app.use('/api/meals', mealsRouter);

// -----------------------------------------------------

// Set up server
app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
