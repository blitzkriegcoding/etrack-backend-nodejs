const tripModel = require('../models/tripModel');
const _ = require('lodash');

tripResultSets = async function(imei, fromTimestamp, toTimestamp) {
  var finalResultSet = [];
  
  var getFilteredTripsResultSet = await tripModel.getFilteredTrips(imei, fromTimestamp, toTimestamp);
  finalResultSet = getFilteredTripsResultSet;
  return finalResultSet;
}


module.exports = {
  tripResultSets
}