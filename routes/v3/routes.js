const express = require('express');
const eventCtrl = require('../../controllers/v3/eventController');
const tripCtrl = require('../../controllers/v3/tripController');

const router = express.Router();

// Routes for events
router.post('/v3/events/can', eventCtrl.eventsByCan);

// Routes for Trips
router.post('/v3/trips/', tripCtrl.getTrips);
module.exports = router;

