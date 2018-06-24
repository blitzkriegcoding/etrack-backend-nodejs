const bp = require('body-parser');
const eventModel = require('../../models/event_model');

const eventCtrl = {};

eventCtrl.excessiveRpmEvent = async function (req, res){
	var imei = req.body.imei;
	var fromTimestamp = req.body.from_timestamp;
	var toTimestamp = req.body.to_timestamp;
	var respA;
	var respB;

	respA = await eventModel.excessiveRpmEvent(imei, fromTimestamp, toTimestamp);
	respB = await eventModel.speedingEndEvent(imei, fromTimestamp, toTimestamp);
	
	console.log(respA, respB);
}

module.exports = eventCtrl;