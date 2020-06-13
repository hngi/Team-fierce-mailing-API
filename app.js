const express = require('express')
const morgan = require('morgan'); //logger
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))


const mailingRouter = require('./api/routes/mailingRoutes')();
const userRouter = require('./api/routes/userRoutes');

app.use('/v1/mail', mailingRouter);
app.use('/v1/user', userRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/v1/documentation', (req, res) => {
  res.sendFile(path.join(__dirname+'/doc.json'));
});

port = process.env.PORT
app.listen(port, function () {
  console.log(`Listening on port ${port}...`)
})

