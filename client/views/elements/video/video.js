/* global elementsDB: false*/

Template.video.onRendered(function () {
    "use strict";

});

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
    },
    link: function () {
        "use strict";
        var url = "http://www.youtube.com/embed/";
        var videoOpt = elementsDB.findOne({"_id": this._id}, {fields: {"data": 1}}).data;

        return url + videoOpt.videoID;

    }
});
Template.video.events({});