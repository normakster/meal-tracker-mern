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
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  logger.info("MongoDB database connection established successfully");
});

// Create Express application
const app = express();
var port = process.env.PORT || '5000';

// View engine

// Install Middleware
// app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(cors());
app.use(express.json());

// Path routing
const usersRouter = require('./routes/users');
const ingredientsRouter = require('./routes/ingredients');
app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);

// -----------------------------------------------------

// Set up server
app.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});
