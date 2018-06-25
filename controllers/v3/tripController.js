const bp = require('body-parser');
const tripService = require('../../services/tripService');

const tripCtrl = {};

tripCtrl.getTrips = async function (req, res){
  var imei = req.body.imei;
  var fromTimestamp = req.body.from_timestamp;
  var toTimestamp = req.body.to_timestamp;
  var result = [];

  result = await tripService.tripResultSets(imei, fromTimestamp, toTimestamp);

  res.send(result);
}

module.exports = tripCtrl;