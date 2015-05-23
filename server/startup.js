/* global ServiceConfiguration: false*/

var accounts = [
    {
        "twitter": [
            {service: "twitter"},
            {
                consumerKey: "E2m2dzLRW0OyI40zpVkTpbktg",
                loginStyle: "popup",
                secret: "wmkMeilvYHmJ1dX4EcDBBsBF9qaQ8646vmDvHXkpQub6k8DtHE",
                service: "twitter"
            }
        ]
    },
    {
        "github": [
            {service: "github"},
            {
                clientId: "c62529396da0d5562211",
                loginStyle: "popup",
                secret: "865a7afc7da39f840bf0624ac128fa0d3416eee4",
                service: "github"
            }
        ]
    },
    {
        google: [
            {service: "google"},
            {
                clientId: "23094185778-nfq17s96agjikjacbqld9ar5s2ik5qku.apps.googleusercontent.com",
                loginStyle: "popup",
                secret: "LlywcE-e2BUdN5wNY8ELId9D",
                service: "google"
            }
        ]
    },
    {
        "facebook": [
            {service: "facebook"},
            {
                clientId: null,
                loginStyle: "popup",
                secret: null,
                service: "facebook"
            }
        ]
    }
];


//_.each(accounts, function (value) {
//    "use strict";
//
//    var service = Object.keys(value)[0];
//    var query = value[service][0];
//    var update = value[service][1];
//    var id = ServiceConfiguration.configurations.upsert(query, update, {upsert: true});
//    console.log(id);
//});

