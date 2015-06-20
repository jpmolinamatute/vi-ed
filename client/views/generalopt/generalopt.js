/* global sectionsDB: false*/
/* global pagesDB: false*/

Template.generalopt.helpers({
    title: function () {
        "use strict";
        return pagesDB.findOne({_id: this._id}, {fields: {title: 1}}).title;
    },
    sectionOpt: function () {
        "use strict";
        var mySections = [];
        sectionsDB.find({pageID: this._id}, {fields: {type: 1}}).forEach(function (value) {
            mySections.push({
                _id: value._id,
                optID: "opt" + value._id,
                label: value.type
            });
        });
        return mySections;
    }
});

Template.generalopt.events({});

Template.generalopt.onRendered(function () {
    "use strict";
});
