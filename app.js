const express = require('express')
const morgan = require('morgan'); //logger
const mailController = require('./api/rcontroller/mailing');
require('dotenv').config()

const app = express();

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('tiny'))

const mailingRouter = require('./api/routes/mailingRoutes')(express.Router(), mailController);

app.use('/api/v1', mailingRouter);
app.get('/', (req, res) => {
  res.send('home')
});

port = 4000
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
});
