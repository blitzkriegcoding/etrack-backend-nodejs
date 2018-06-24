const express = require('express');
const eventCtrl = require('../../controllers/v3/event_controller');
const tripCtrl = require('../../controllers/v3/trip_controller');

const router = express.Router();

// Routes for events
router.post('/v3/events/can', eventCtrl.eventsByCan);

// Routes for Trips

module.exports = router;

