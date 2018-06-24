const express = require('express');
const bp = require('body-parser');
const tds = require('tedious');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('../routes/v3/routes');
// const sqlSrv = require('./dbConfig');

const app = express();

app.use(cors());
app.use(bp.json());
app.use('/api', routes);

app.get('/test', function(req, res){
	res.json({t: 'Hola'});
});

app.listen(process.env.PORT || 4001);