const express = require('express');
require("dotenv").config();
const { default: mongoose } = require('mongoose');
const {logErrors, errorHandler, boomErrorHandler} = require('./src/middlewares/handlers/errors.handlers')
const APP = express();
const PORT = process.env.PORT || 3000;
const routerApi = require('./src/routes')



APP.listen(PORT, () => console.log('Listen PORT', PORT));
APP.use(express.json());

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Succes connection with mongo"))
    .catch(() => console.error("Connection could not be established"));

routerApi(APP);

APP.use(logErrors)
APP.use(boomErrorHandler)
APP.use(errorHandler)
