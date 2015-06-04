/* global elementsDB: false*/


Template.video.onRendered(function () {
    "use strict";

});
Template.video.helpers({
    info: function () {
        "use strict";

        return elementsDB.findOne({"_id": this._id}, {
            fields: {
                "style.width": 1,
                "style.height": 1,
                "data.videoID": 1
            }
        });
    },

    iframe: function () {
        "use strict";

        var videoOpt = elementsDB.findOne({"_id": this._id}, {
            fields: {
                "data": 1,
                "style.width": 1,
                "style.height": 1
            }
        });
        var data = {};
        data.url = videoOpt.data.videoID + "?";
        data.url += "autohide=";
        data.url += videoOpt.data.autohide ? "1" : "0";
        data.url += "&autoplay=";
        data.url += videoOpt.data.autoplay ? "1" : "0";
        data.url += "&loop=";
        data.url += videoOpt.data.loop ? "1" : "0";
        data.url += "&controls=";
        data.url += videoOpt.data.control ? "1" : "0";
        if (videoOpt.data.playlist.length) {
            data.url += "&playlist=";
            data.url += videoOpt.data.playlist.toString();
        }
        data.width = videoOpt.style.width;
        data.height = videoOpt.style.height;
        return data;

    }
});
Template.video.events({});

Template.videoOpt.events({
    "click div#video-opt": function (event) {
        "use strict";
        event.stopPropagation();
    },
    "change input#yt-autohide": function (event) {
        "use strict";

        var bool = $(event.currentTarget).is(":checked");
        elementsDB.update({_id: this._id}, {$set: {"data.autohide": bool}});
    },
    "change input#yt-autoplay": function (event) {
        "use strict";

        var bool = $(event.currentTarget).is(":checked");
        elementsDB.update({_id: this._id}, {$set: {"data.autoplay": bool}});
    },
    "change input#yt-control": function (event) {
        "use strict";

        var bool = $(event.currentTarget).is(":checked");
        elementsDB.update({_id: this._id}, {$set: {"data.control": bool}});
    },
    "change input#yt-loop": function (event) {
        "use strict";

        var bool = $(event.currentTarget).is(":checked");
        elementsDB.update({_id: this._id}, {$set: {"data.loop": bool}});
    },
    "blur input#yt-id": function (event) {
        "use strict";
        var regEx = /[a-z0-9_-]{11}/i;
        var videoID = $(event.currentTarget).val();

        if (regEx.test(videoID)) {
            elementsDB.update({_id: this._id}, {$set: {"data.videoID": videoID}});
        }

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
    info: function () {
        "use strict";
        return elementsDB.findOne({"_id": this._id}, {fields: {data: 1}});
    }
});