/* global eDefaultsDB:false*/
Template.toolbar.onRendered(function () {
    "use strict";
    var tools = this.$("div.tools");
    tools.draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100,
        start: function () {
            $("div#vied-main").css("background-color", "darkgrey");
        },
        stop: function () {
            $("div#vied-main").css("background-color", "#6DBDD6");
        }
    });
});

Template.toolbar.helpers({
    data: function(){
        "use strict";
        return eDefaultsDB.find({}, {fields:{type: 1, img: 1, label:1}});
    }
});