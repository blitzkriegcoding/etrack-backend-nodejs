const bp = require('body-parser');
//const eventModel = require('../../models/event_model');
const eventService = require('../../services/eventByCanService');

// const _ = require('lodash'); // En caso de no disponer de funciones nativas

const eventCtrl = {};

eventCtrl.eventsByCan = async function (req, res){
	var imei = req.body.imei;
	var fromTimestamp = req.body.from_timestamp;
	var toTimestamp = req.body.to_timestamp;
	var result = [];


	// Todos estos métodos fueron transferidos a un servicio
	// var excessiveRpmEventResultSet = await eventModel.excessiveRpmEvent(imei, fromTimestamp, toTimestamp);
	// var speedingEndEventResultSet = await eventModel.speedingEndEvent(imei, fromTimestamp, toTimestamp);
	// var excessiveRalentiEventResultSet = await eventModel.excessiveRalentiEvent(imei, fromTimestamp, toTimestamp);
	// var coastingEventResultSet = await eventModel.coastingEvent(imei, fromTimestamp, toTimestamp);
	// var faultCodeEventResultSet = await eventModel.faultCodeEvent(imei, fromTimestamp, toTimestamp);
	// var suddenAccelerationEventResultSet = await eventModel.suddenAccelerationEvent(imei, fromTimestamp, toTimestamp);
	// var hardBrakingEventResultSet = await eventModel.hardBrakingEvent(imei, fromTimestamp, toTimestamp);
	// var fuelLeakEventResultSet = await eventModel.fuelLeakEvent(imei, fromTimestamp, toTimestamp);
	result = await eventService.eventResultSets(imei, fromTimestamp, toTimestamp);

	res.send(result);
}

module.exports = eventCtrl;