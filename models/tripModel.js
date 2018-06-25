var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require("tedious").TYPES;
const db = require('../src/dbController');


function getFilteredTrips(imei, from_timestamp, to_timestamp) {
  var params = [];
  var sqlQuery = "select distinct t2.imei, t2.energization_number, t2.trip_number from gps_event_measurement t1\
                                        left outer join can_event t2 on (t1._id = t2.gps_event_measurement_id)\
                                        left join can_event_trip_start_record t3 on (t1._id = t3.can_event_id and t2.trip_number = t3.trip_number and t2.energization_number = t3.energization_number)\
                                        left join can_event_trip_end_record t4 on (t1._id = t4.can_event_id and t2.trip_number = t4.trip_number and t2.energization_number = t4.energization_number)\
                                        where t2.imei is not null and\
                                        t1.imei = @imei\
                                        and t1.gps_utc_time between @fromTimestamp \
                                        and @toTimestamp \
                                        order by t2.energization_number asc, t2.trip_number asc"
  db.buildParams(params, "imei", TYPES.BigInt, imei);
  db.buildParams(params, "fromTimestamp", TYPES.DateTime2, from_timestamp);
  db.buildParams(params, "toTimestamp", TYPES.DateTime2, to_timestamp);

  return new Promise((resolve, reject) => {
    db.query(params, sqlQuery, result => {
      return resolve(result);
    });
  });
}


function getTripPositions(imei, tripNumber, energizationNumber) {

}

function getTripEvents(imei, tripNumber, energizationNumber) {

}

module.exports = {
  getFilteredTrips,
  getTripPositions,
  getTripEvents
}