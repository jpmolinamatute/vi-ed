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

        var videoOpt = elementsDB.findOne({"_id": this._id}, {fields: {"data": 1}}).data;
        var url = videoOpt.videoID + "?";
        url += "autohide=";
        url += videoOpt.autohide ? "1" : "0";
        url += "&autoplay=";
        url += videoOpt.autoplay ? "1" : "0";
        url += "&loop=";
        url += videoOpt.loop ? "1" : "0";
        if (videoOpt.playlist.length) {
            url += "&playlist=";
            url += videoOpt.playlist.toString();
        }

        console.log(url);
        return url;

    }
});
Template.video.events({});
Template.videoOpt.events({
    "click div#video-opt": function (event) {
        "use strict";
        event.stopPropagation();
    }
});

Template.videoOpt.helpers({
    toString: function (list) {
        "use strict";

        var result = "";
        if (Array.isArray(list)) {
            list.toString();
        }
        return result;
    },
    data: function () {
        "use strict";
        console.log(this._id);
        return elementsDB.findOne({"_id": this._id}, {fields: {data: 1}}).data;
    }
});