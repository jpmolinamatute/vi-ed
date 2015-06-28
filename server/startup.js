/* global ServiceConfiguration: false*/




//_.each(accounts, function (value) {
//    "use strict";
//
//    var service = Object.keys(value)[0];
//    var query = value[service][0];
//    var update = value[service][1];
//    var id = ServiceConfiguration.configurations.upsert(query, update, {upsert: true});
//    console.log(id);
//});

console.log("===================================================");

console.log(ServiceConfiguration.configurations.find().fetch());
console.log("===================================================");