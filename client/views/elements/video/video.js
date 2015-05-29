/* global elementsDB: false*/

Template.video.rendered = function () {
    "use strict";

};
Template.video.helpers({
    myWidth: function () {
        "use strict";
        var w = elementsDB.findOne({"_id": this._id}, {fields: {"style.width": 1}}).style.width;
        return parseInt(w, 10);

    },
    myHeight: function () {
        "use strict";
        var h = elementsDB.findOne({"_id": this._id}, {fields: {"style.height": 1}}).style.height;
        return parseInt(h, 10);
    }
});
Template.video.events({});