/*global elementsDB: true*/
/*global sectionsDB: true*/
/*global pagesDB: true*/
/*global eDefaultsDB: true*/
/*global uploadsDB: true*/
/*global MongoInternals: false*/


var driver = {};

if (Meteor.settings &&
    Meteor.settings.mongodb &&
    Meteor.isServer) {
    driver._driver = new MongoInternals.RemoteCollectionDriver(Meteor.settings.mongodb);
    console.log("hola!");
}
elementsDB = new Mongo.Collection("elements", driver);
sectionsDB = new Mongo.Collection("sections", driver);
pagesDB = new Mongo.Collection("pages", driver);
eDefaultsDB = new Mongo.Collection("elementDefault", driver);
uploadsDB = new Mongo.Collection("uploads", driver);