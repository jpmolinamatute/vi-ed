/* global elementsDB:false*/
Meteor.methods({
    elementUpsert: function (id, doc) {
        "use strict";
        check(id, Object);
        check(doc, Object);
        console.log(id, doc);
        elementsDB.upsert(id, doc);
    }
});