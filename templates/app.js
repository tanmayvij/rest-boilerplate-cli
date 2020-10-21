const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

const system = require('./system');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use(cors());

app.use(morgan('dev'));

app.use('/api', system);
app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

module.exports = app;