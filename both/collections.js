/*global elementsDB: true*/
/*global sectionsDB: true*/
/*global pagesDB: true*/
/*global eDefaultsDB: true*/
/*global uploadsDB: true*/


elementsDB = new Mongo.Collection("elements");
sectionsDB = new Mongo.Collection("sections");
pagesDB = new Mongo.Collection("pages");
eDefaultsDB = new Mongo.Collection("elementDefault");
uploadsDB = new Mongo.Collection("uploads");


