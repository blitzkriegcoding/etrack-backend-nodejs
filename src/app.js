const express = require('express');
const bp = require('body-parser');
const tds = require('tedious');
const cors = require('cors');

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bp.json());
