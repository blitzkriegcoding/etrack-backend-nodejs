var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require("tedious").TYPES;
var uuid = require('node-uuid');
var async = require('async');
const dbController = require('../src/dbController.js');


var data = [];

function start(callback) {
  console.log('Starting...');
  callback(null, 'Jake', 'United States');
}

function excessiveRpmEvent(imei, from_timestamp, to_timestamp/*, callback*/) {
  var params = [];
  var sqlQuery = "select t1.gps_utc_time, t1.latitude, t1.longitude, t3.engine_max_rpm, t3.event_time_length_secs \
	                          FROM gps_event_measurement t1 \
	                          LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id) \
	                          INNER JOIN can_event_rpm_event t3 ON (t2._id = t3.can_event_id) \
	                          where t1.imei = @imei \
	                          and t1.gps_utc_time between @fromTimestamp \
	                          and @toTimestamp order by t1.gps_utc_time asc";

  dbController.buildParams(params, "imei", TYPES.BigInt, imei);
  dbController.buildParams(params, "fromTimestamp", TYPES.DateTime2, from_timestamp);
  dbController.buildParams(params, "toTimestamp", TYPES.DateTime2, to_timestamp);


  return new Promise((resolve, reject) => {
		dbController.query(params, sqlQuery, result => {
			// callback(result);	  	
			return resolve(result);
	  });
  });
}

function speedingEndEvent(imei, from_timestamp, to_timestamp/*, callback*/) {
  var params = [];
  var sqlQuery = "select t1.gps_utc_time, t1.latitude, t1.longitude, t3.max_speed_kmh, t3.event_time_length_secs, t3.event_end_time_secs \
  								FROM gps_event_measurement t1 LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id) \
  								INNER JOIN can_event_speeding_event_end t3 ON (t2._id = t3.can_event_id) \
                  where t1.imei = @imei \
                  and t1.gps_utc_time between @fromTimestamp \
                  and @toTimestamp order by t1.gps_utc_time asc";

  dbController.buildParams(params, "imei", TYPES.BigInt, imei);
  dbController.buildParams(params, "fromTimestamp", TYPES.DateTime2, from_timestamp);
  dbController.buildParams(params, "toTimestamp", TYPES.DateTime2, to_timestamp);

  return new Promise((resolve, reject) => {
		dbController.query(params, sqlQuery, result => {
			return resolve(result);
	  });
  });
}



module.exports = {
	excessiveRpmEvent,
	speedingEndEvent
}



