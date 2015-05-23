/* global elementsDB:false*/
/* global sectionsDB:false*/
Meteor.methods({
    elementUpsert: function (id, doc) {
        "use strict";
        check(id, Object);
        check(doc, Object);
        elementsDB.upsert(id, doc);
    },
    sectionUpsert: function (id, doc) {
        "use strict";
        check(id, Object);
        check(doc, Object);
        sectionsDB.upsert(id, doc);
    }
});