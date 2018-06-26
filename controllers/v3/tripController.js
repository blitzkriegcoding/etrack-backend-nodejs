const bp = require('body-parser');
const tripService = require('../../services/tripService');

const tripCtrl = {};

tripCtrl.getTrips = async function (req, res){
  var imei = req.body.imei;
  var fromTimestamp = req.body.from_timestamp;
  var toTimestamp = req.body.to_timestamp;
  if(imei === null || fromTimestamp === null || toTimestamp === null){
    res.status(404).send('Not found');
  }  
  var result = [];

  result = await tripService.tripResultSets(imei, fromTimestamp, toTimestamp);

  res.status(200).json(result);
}

tripCtrl.getTripsPositions = async function(req, res){

  var imei = req.body.imei;
  var tripNumber = req.body.trip_number;
  var energizationNumber = req.body.energization_number;
  if(imei === null || tripNumber === null || energizationNumber === null){
    res.status(404).send('Not found');
  }
  var result = [];
  result = await tripService.tripsPositionsResultSets(imei, tripNumber, energizationNumber);

  res.status(200).json(result);
}

tripCtrl.getTripsEvents = async function(req, res){

  var imei = req.body.imei;
  var tripNumber = req.body.trip_number;
  var energizationNumber = req.body.energization_number;
  if(imei === null || tripNumber === null || energizationNumber === null){
    res.status(404).send('Not found');
  }
  var result = [];
  result = await tripService.tripsEventsResultSets(imei, tripNumber, energizationNumber);
  res.status(200).json(result);
}

module.exports = tripCtrl;