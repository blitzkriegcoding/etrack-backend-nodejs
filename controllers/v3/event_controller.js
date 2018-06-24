const bp = require('body-parser');
const eventModel = require('../../models/event_model');
// const _ = require('lodash');

const eventCtrl = {};

eventCtrl.excessiveRpmEvent = async function (req, res){
	var imei = req.body.imei;
	var fromTimestamp = req.body.from_timestamp;
	var toTimestamp = req.body.to_timestamp;
	var result = [];
	var respA = [];
	var respB = [];

	respA = await eventModel.excessiveRpmEvent(imei, fromTimestamp, toTimestamp);
	respB = await eventModel.speedingEndEvent(imei, fromTimestamp, toTimestamp);
	var respB = [{'data': 123456}];
	result = respB.concat(respA);


	res.send(result);
}

module.exports = eventCtrl;