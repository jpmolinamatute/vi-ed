/* global elementsDB: false*/
/* global videoList: true*/
/* global videoIndex: true*/

videoList = [];
videoIndex = 0;

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
    list: function(){
        "use strict";
        var list = elementsDB.findOne({_id: this._id}, {fields: {"data.playlist": 1}}).data.playlist;
        var currentVideo;
        if(list.length){
            currentVideo = elementsDB.findOne({_id: this._id}, {fields: {"data.videoID": 1}}).data.videoID;
            list.unshift(currentVideo);
            videoList = list;
        }

        return list.length ? true : false;
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
Template.video.events({
    "click div.yt-list button.next": function(event){
        "use strict";

        var $img = $(event.currentTarget).closest("div.element-container").find("img");
        var link;
        console.log("list index ", videoIndex);

        if(videoIndex < videoList.length){
            link = "http://img.youtube.com/vi/" + videoList[videoIndex] + "/0.jpg";
            $img.attr("src", link);
            videoIndex++;
        } else {
            link = "http://img.youtube.com/vi/" + videoList[0] + "/0.jpg";
            $img.attr("src", link);
            videoIndex = 0;
        }
    },
    "click div.yt-list button.previous": function(event){
        "use strict";
        var $img = $(event.currentTarget).closest("div.element-container").find("img");
        var link;
        console.log("list index ", videoIndex);
        if(videoIndex > 0){
            link = "http://img.youtube.com/vi/" + videoList[videoIndex] + "/0.jpg";
            $img.attr("src", link);
            videoIndex--;
        }else{
            link = "http://img.youtube.com/vi/" + videoList[videoIndex] + "/0.jpg";
            $img.attr("src", link);
            videoIndex = videoList.length - 1;
        }
    }
});

Template.videoOpt.events({
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
    },
    "blur textarea#yt-playlist": function (event) {
        "use strict";
        var text = $(event.currentTarget).val();
        var separator;
        var playlist = [];
        var tmpPlayList = [];
        var regEx = /[a-z0-9_-]{11}/i;
        var regEx2 = /[^a-z0-9_-]/i;
        var currVideoId = elementsDB.findOne({_id: this._id}, {fields: {"data.videoID": 1}}).data.videoID;

        if (text.length === 11 && text !== currVideoId) {
            if (regEx.test(text)) {
                playlist.push(text);
            }
        } else if (text.length > 11) {
            separator = text.charAt(11);
            if (regEx2.test(separator)) {
                tmpPlayList = text.split(separator);
                _.each(tmpPlayList, function (value) {
                    value = value.trim();
                    if (regEx.test(value) && playlist.indexOf(value) === -1 && value !== currVideoId) {
                        playlist.push(value);
                    }
                });
            }
        }

        elementsDB.update({_id: this._id}, {$set: {"data.playlist": playlist}});
    }
});

Template.videoOpt.helpers({
    toString: function (list) {
        "use strict";

        var result = "";
        var limit;
        if (Array.isArray(list)) {
            limit = list.length - 1;
            _.each(list, function(value, key){
                result += value;
                result += key !== limit ? ", " : "";
            });
        }
        return result;
    },
    info: function () {
        "use strict";
        return elementsDB.findOne({"_id": this._id}, {fields: {data: 1}});
    }
});

Template.videoOpt.onRendered(function (){
    "use strict";

});