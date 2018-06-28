var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require("tedious").TYPES;
const db = require('../src/dbController');


function getFilteredTrips(imei, from_timestamp, to_timestamp) {
  var params = [];
  var sqlQuery = "select distinct t1.imei, t1.energization_number, t1.trip_number from can_event t1\
                  left join can_event_trip_start_record t3 on (t1._id = t3.can_event_id and t1.trip_number = t3.trip_number and t1.energization_number = t3.energization_number)\
                  left join can_event_trip_end_record t4 on (t1._id = t4.can_event_id and t1.trip_number = t4.trip_number and t1.energization_number = t4.energization_number)\
                  where t1.imei = @imei\
                  and t1.gps_utc_time between @fromTimestamp \
                  and @toTimestamp \
                  order by t1.energization_number asc, t1.trip_number asc"
  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "fromTimestamp", TYPES.DateTime2, from_timestamp);
  db.buildParams(params, "toTimestamp", TYPES.DateTime2, to_timestamp);

  return new Promise((resolve, reject) => {
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripStart(imei, trip_number, energization_number) {
  var params = [];
  var sqlQuery = "select top(1) t2.data_read_utc_time as utc_time, \
                  t2.latitude, t2.longitude, t1.odometer_kms, t1.odoliter_lts, t1.horometer_hrs \
                  from can_event_trip_start_record t1 \
                  inner join can_event t2 on (t1.can_event_id = t2._id) \
                  where t2.imei = @imei \
                  and t1.trip_number = @tripNumber \
                  and t1.energization_number = @energizationNumber \
                  order by utc_time asc";

  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripEnd(imei, trip_number, energization_number) {
  var params = [];
  var sqlQuery = "select top(1) t2.data_read_utc_time as utc_time, \
                  t2.latitude, t2.longitude, t1.end_odometer_kms as odometer_kms, \
                  t1.end_odoliter_lts as odoliter_lts, t1.end_horometer_hrs as horometer_hrs \
                  from can_event_trip_end_record t1\
                  inner join can_event t2 on (t1.can_event_id = t2._id) \
                  where t2.imei = @imei \
                  and t1.trip_number = @tripNumber \
                  and t1.energization_number = @energizationNumber \
                  order by utc_time desc";

  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });  

}

function getTripPositions(imei, trip_number, energization_number) {
  var params = [];
  var sqlQuery = "SELECT gem.altitude,\
                  gem.azimuth,\
                  gem.gps_utc_time,\
                  gem.latitude,\
                  gem.longitude\
                  FROM gps_event_measurement gem\
                  INNER JOIN can_event t1 ON gem._id = t1.gps_event_measurement_id\
                  WHERE \
                  gem.imei = @imei \
                  and t1.trip_number = @tripNumber \
                  AND t1.energization_number = @energizationNumber \
                  ORDER BY gps_utc_time asc";

  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });                   

}

function getTripExcessiveRpmEvent(imei, trip_number, energization_number) {
  console.log('getTripExcessiveRpmEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.engine_max_rpm,\
                  t3.event_time_length_secs\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_rpm_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc";

  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  }); 

}

function getTripSpeedingStartEvent(imei, trip_number, energization_number) {
  console.log('getTripSpeedingStartEvent');
  var params = [];

  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.speed_kmh,\
                  t3.event_start_time_secs\
                  FROM gps_event_measurement t1 \
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id) \
                  INNER JOIN can_event_speeding_event_start t3 ON (t2._id = t3.can_event_id) \
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc";

  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
        return resolve(result);
    });
  }); 

}


function getTripSpeedingEndEvent(imei, trip_number, energization_number) {
  console.log('getTripSpeedingEndEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.max_speed_kmh,\
                  t3.event_time_length_secs,\
                  t3.event_end_time_secs\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_speeding_event_end t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripExcessiveRalentiEvent(imei, trip_number, energization_number) {
  console.log('getTripExcessiveRalentiEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.event_time_length_secs,\
                  t3.event_start_time_secs\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_ralenti_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripCoastingEvent(imei, trip_number, energization_number) {
  console.log('getTripCoastingEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.max_speed_kmh,\
                  t3.event_time_length_secs,\
                  t3.event_end_time_secs\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_coasting_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripFaultCodeEvent(imei, trip_number, energization_number) {
  console.log('getTripFaultCodeEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.malfunction_indicator_lamp,\
                  t3.red_engine_light,\
                  t3.ambar_engine_light,\
                  t3.protect_lamp,\
                  t3.suspect_parameter_number,\
                  t3.fault_mode_indicator,\
                  t3.ocurrence_count\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_fault_code_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber\
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripSuddenAccelerationEvent(imei, trip_number, energization_number) {
  console.log('getTripSuddenAccelerationEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.event_start_time_secs,\
                  t3.activation_speed_kmh,\
                  t3.acceleration_delta_speed_ms2,\
                  t3.end_speed_kmh\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_sudden_acceleration_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber \
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

function getTripHardBrakingEvent(imei, trip_number, energization_number) {
  console.log('getTripHardBrakingEvent');
  var params = [];
  var sqlQuery = "select \
                  t1.gps_utc_time,\
                  t1.latitude,\
                  t1.longitude,\
                  t3.event_start_time_secs,\
                  t3.activation_speed_kmh,\
                  t3.acceleration_delta_speed_ms2,\
                  t3.end_speed_kmh\
                  FROM gps_event_measurement t1\
                  LEFT JOIN can_event t2 ON (t1._id = t2.gps_event_measurement_id)\
                  INNER JOIN can_event_sudden_acceleration_event t3 ON (t2._id = t3.can_event_id)\
                  where t1.imei = @imei and t2.trip_number = @tripNumber \
                  and t2.energization_number = @energizationNumber\
                  order by t1.gps_utc_time asc"


  db.buildParams(params, "imei", TYPES.VarChar, imei);
  db.buildParams(params, "tripNumber", TYPES.Int, trip_number);
  db.buildParams(params, "energizationNumber", TYPES.Int, energization_number);

  return new Promise((resolve, reject) => {   
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}

module.exports = {
  getFilteredTrips,
  getTripPositions,
  getTripStart,
  getTripEnd,
  getTripExcessiveRpmEvent,
  getTripSpeedingStartEvent,
  getTripSpeedingEndEvent,
  getTripExcessiveRalentiEvent,
  getTripCoastingEvent,
  getTripFaultCodeEvent,
  getTripSuddenAccelerationEvent,
  getTripHardBrakingEvent  
}