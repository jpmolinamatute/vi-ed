var getServiceQuery = function (service) {
    "use strict";
    var query = {};
    if ("twitter" === service) {
        query = {
            "services.twitter.screenName": 1,
            "services.twitter.profile_image_url_https": 1
        };
    } else if ("github" === service) {
        query = {
            "services.github.username": 1
        };
    } else if ("google" === service){
        query = {};
        //@TODO: work on google account login
    }

    return query;
}
var getService = function () {
    "use strict";
    if (Meteor.userId()) {
        var value = "";
        var service = Meteor.users.find({}, {
                fields: {services: 1}
            }
        ).fetch()[0];
        if (service.services.twitter) {
            value = "twitter";
        } else if (service.services.github) {
            value = "github";
        } else if (service.services.google) {
            value = "google";
        }
        return value;
    }
};

Template.user_bar.helpers({
    viedUser: function () {
        var service = getService();
        var query = getServiceQuery(service);
        var info = Meteor.users.find({}, {
            fields: query
        }).fetch()[0];
        var user = "";
        if()


        return user;
    }
});

Template.user_bar.rendered = function () {
    "use strict";
};