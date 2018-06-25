const eventModel = require('../models/eventModel');
const _ = require('lodash');

eventResultSets = async function(imei, fromTimestamp, toTimestamp) {
	var finalResultSet = [];
	
	var excessiveRpmEventResultSet = await eventModel.excessiveRpmEvent(imei, fromTimestamp, toTimestamp);
	var speedingEndEventResultSet = await eventModel.speedingEndEvent(imei, fromTimestamp, toTimestamp);
	var excessiveRalentiEventResultSet = await eventModel.excessiveRalentiEvent(imei, fromTimestamp, toTimestamp);
	var coastingEventResultSet = await eventModel.coastingEvent(imei, fromTimestamp, toTimestamp);
	var faultCodeEventResultSet = await eventModel.faultCodeEvent(imei, fromTimestamp, toTimestamp);
	var suddenAccelerationEventResultSet = await eventModel.suddenAccelerationEvent(imei, fromTimestamp, toTimestamp);
	var hardBrakingEventResultSet = await eventModel.hardBrakingEvent(imei, fromTimestamp, toTimestamp);
	var fuelLeakEventResultSet = await eventModel.fuelLeakEvent(imei, fromTimestamp, toTimestamp);

	finalResultSet = [].concat(excessiveRpmEventResultSet, speedingEndEventResultSet, excessiveRalentiEventResultSet, coastingEventResultSet, faultCodeEventResultSet, suddenAccelerationEventResultSet, hardBrakingEventResultSet, fuelLeakEventResultSet);

	return finalResultSet;
}


module.exports = {
	eventResultSets
}