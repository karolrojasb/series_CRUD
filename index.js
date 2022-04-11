const express = require('express');
require("dotenv").config();
const { default: mongoose } = require('mongoose');
const {logErrors, errorHandler, boomErrorHandler} = require('./src/middlewares/handlers/errors.handlers')
const APP = express();
const PORT = process.env.PORT || 5000;
const routerApi = require('./src/routes')

APP.listen(PORT, () => console.log('Listen PORT', PORT));
APP.use(express.json());
APP.use(express.urlencoded({extended:false}))

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Succes connection with mongo"))
    .catch(() => console.error("Connection could not be established"));

routerApi(APP);

APP.use(logErrors)
APP.use(boomErrorHandler)
APP.use(errorHandler)

// ================ Twilio SMS ========================
const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio = require('twilio');
const client = new twilio(accountSID, authToken);

/* Enviar mensaje */

client.messages
  .create({
    body: 'Hello from Node',
    from: '+12054489172', // From a valid Twilio number
    to: '+573155860681', // Text this number
  })
  .then((message) => console.log(`mensaje enviado ${message.sid}`))
  .catch((err)=>console.log(err))

// ===================== SENDGRID ==============================
const email = require('./src/services/sendgrid/email')

APP.get('/',(req, res, next) => {
  res.json({message: 'Success'})
})

/* http://localhost:5000/api/email/confirmacion */
APP.post('/api/email/confirmacion', async(req, res, next)=>{
  try {
    res.json(await email.sendOrder(req.body))
  } catch(err) {
    next(err)
  }
})

APP.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500
  console.error(err.message, err.stack)
  res.status(statusCode).json({'message': err.message})
  return
})