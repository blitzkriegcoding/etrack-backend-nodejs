const eventModel = require('../models/event_model');
const _ = require('lodash'); // In case of...

eventResultSets = async function(imei, fromTimestamp, toTimestamp) {
	var finalResultSet = [];
	console.log(imei, fromTimestamp, toTimestamp);
	var excessiveRpmEventResultSet = await eventModel.excessiveRpmEvent(imei, fromTimestamp, toTimestamp);
	var speedingEndEventResultSet = await eventModel.speedingEndEvent(imei, fromTimestamp, toTimestamp);
	var excessiveRalentiEventResultSet = await eventModel.excessiveRalentiEvent(imei, fromTimestamp, toTimestamp);
	var coastingEventResultSet = await eventModel.coastingEvent(imei, fromTimestamp, toTimestamp);
	var faultCodeEventResultSet = await eventModel.faultCodeEvent(imei, fromTimestamp, toTimestamp);
	var suddenAccelerationEventResultSet = await eventModel.suddenAccelerationEvent(imei, fromTimestamp, toTimestamp);
	var hardBrakingEventResultSet = await eventModel.hardBrakingEvent(imei, fromTimestamp, toTimestamp);
	var fuelLeakEventResultSet = await eventModel.fuelLeakEvent(imei, fromTimestamp, toTimestamp);

	finalResultSet.concat(excessiveRpmEventResultSet, speedingEndEventResultSet, excessiveRalentiEventResultSet, coastingEventResultSet, faultCodeEventResultSet, suddenAccelerationEventResultSet, hardBrakingEventResultSet, fuelLeakEventResultSet);
	console.log(excessiveRpmEventResultSet);
	return excessiveRpmEventResultSet;

}


module.exports = {
	eventResultSets
}