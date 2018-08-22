// TODO
const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
const routes = require('./routes');

// Setup db
mongoose.Promise = global.Promise;
console.log("connection url: " + config.mongoUri);
const mongoUri = "mongodb://127.0.0.1:27017/players-api";
mongoose.connect(mongoUri);//config.mongoUri);
mongoose.connection.on('error', console.error.bind(console, 'mongo connection error:'));

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  res.status(err.status || 409);
  res.send(err.message);
});

var port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
