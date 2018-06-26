const express = require('express');
const eventCtrl = require('../../controllers/v3/eventController');
const tripCtrl = require('../../controllers/v3/tripController');

const router = express.Router();

// Routes for events
router.post('/v3/events/can', eventCtrl.eventsByCan);

// Routes for Trips
router.post('/v3/trips/', tripCtrl.getTrips);
router.post('/v3/trips/positions/', tripCtrl.getTripsPositions);
router.post('/v3/trips/events/', tripCtrl.getTripsEvents);
module.exports = router;

