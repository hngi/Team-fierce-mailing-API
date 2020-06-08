/* eslint-disable no-undef */
const express = require('express')
const debug = require('debug')('app')
const morgan = require('morgan'); //logger
const path = require('path')
const chalk = require('chalk')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))


const mailingRouter = require('./src/routes/mailingRoutes')()

app.use('/mailer', mailingRouter);

app.get('/', (req, res) => {
  res.send('home')
});

port = 4000
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

