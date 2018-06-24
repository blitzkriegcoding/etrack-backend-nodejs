const express = require('express');
const bp = require('body-parser');
const tds = require('tedious');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('../routes/v3/routes');

const app = express();

app.use(cors());
app.use(bp.json());
app.use('/api', routes);

app.listen(process.env.PORT || 4001);