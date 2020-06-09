const express = require('express')
const morgan = require('morgan'); //logger
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/email-api.json')
require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))


const mailingRouter = require('./api/routes/mailingRoutes')()

app.use('/api/v1', mailingRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));

app.get('/', (req, res) => {
  res.send('home')
});

port = 4000
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

