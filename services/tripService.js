const tripModel = require('../models/tripModel');
const _ = require('lodash');

tripResultSets = async function(imei, fromTimestamp, toTimestamp) {
  var finalResultSet = [];
  
  var getFilteredTripsResultSet = await tripModel.getFilteredTrips(imei, fromTimestamp, toTimestamp);
  finalResultSet = getFilteredTripsResultSet;
  return finalResultSet;
}

tripsPositionsResultSets = async function(imei, trip_number, energization_number){
  var finalResultSet = [];
  var getTripStartResultSet = await tripModel.getTripStart(imei, trip_number, energization_number);
  var getTripEndResultSet = await tripModel.getTripEnd(imei, trip_number, energization_number);
  var getTripPositionsResultSet = await tripModel.getTripPositions(imei, trip_number, energization_number);

  finalResultSet = _.concat(getTripStartResultSet, getTripEndResultSet, getTripPositionsResultSet);
  return finalResultSet;
}

tripsEventsResultSets = async function(imei, trip_number, energization_number){
  var finalResultSet = [];

  var getTripExcessiveRpmEventResultSet = await tripModel.getTripExcessiveRpmEvent(imei, trip_number, energization_number);
  var getTripSpeedingStartEventResultSet = await tripModel.getTripSpeedingStartEvent(imei, trip_number, energization_number);
  var getTripSpeedingEndEventResultSet = await tripModel.getTripSpeedingEndEvent(imei, trip_number, energization_number);
  var getTripExcessiveRalentiEventResultSet = await tripModel.getTripExcessiveRalentiEvent(imei, trip_number, energization_number);
  var getTripCoastingEventResultSet = await tripModel.getTripCoastingEvent(imei, trip_number, energization_number);
  var getTripFaultCodeResultSet = await tripModel.getTripFaultCodeEvent(imei, trip_number, energization_number);
  var getTripSuddenAccelerationResultSet = await tripModel.getTripSuddenAccelerationEvent(imei, trip_number, energization_number);
  var getTripHardBrakingResultSet = await tripModel.getTripHardBrakingEvent(imei, trip_number, energization_number);

  finalResultSet = _.concat(getTripExcessiveRpmEventResultSet, getTripSpeedingStartEventResultSet, getTripSpeedingEndEventResultSet, 
                             getTripExcessiveRalentiEventResultSet, getTripCoastingEventResultSet, getTripFaultCodeResultSet, 
                             getTripSuddenAccelerationResultSet, getTripHardBrakingResultSet);

  return finalResultSet;
}

module.exports = {
  tripResultSets,
  tripsPositionsResultSets,
  tripsEventsResultSets
}