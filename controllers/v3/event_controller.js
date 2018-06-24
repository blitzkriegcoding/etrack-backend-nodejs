const bp = require('body-parser');
const eventService = require('../../services/eventByCanService');

const eventCtrl = {};

eventCtrl.eventsByCan = async function (req, res){
	var imei = req.body.imei;
	var fromTimestamp = req.body.from_timestamp;
	var toTimestamp = req.body.to_timestamp;
	var result = [];

	result = await eventService.eventResultSets(imei, fromTimestamp, toTimestamp);

	res.send(result);
}

module.exports = eventCtrl;