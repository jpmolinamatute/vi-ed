/*global elementsDB: true*/
/*global sectionsDB: true*/
/*global pagesDB: true*/
/*global eDefaultsDB: true*/
/*global MongoInternals: false*/


var driver = {};
var mongo;

if (Meteor.settings &&
    Meteor.settings.mongodb &&
    Meteor.settings.localhost &&
    Meteor.isServer) {
    mongo = new MongoInternals.RemoteCollectionDriver(Meteor.settings.mongodb);
    driver._driver = mongo;
}

elementsDB = new Mongo.Collection("elements", driver);
sectionsDB = new Mongo.Collection("sections", driver);
pagesDB = new Mongo.Collection("pages", driver);
eDefaultsDB = new Mongo.Collection("elementDefault", driver);