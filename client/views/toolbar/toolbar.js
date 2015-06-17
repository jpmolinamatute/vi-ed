/* global eDefaultsDB:false*/
Template.toolbar.onRendered(function () {
    "use strict";
    var tools = this.$("div.tools");
    var $filler = $("div#vied-statusbar-filler");
    var $opt1 = $("div#vied-statusbar-opt1");
    var $opt2 = $("div#vied-statusbar-opt2");


    tools.draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100,
        start: function (event, ui) {
            var top = Math.round(ui.position.top * 100) / 100;
            var left = Math.round(ui.position.left * 100) / 100;
            $("div#vied-main").css("background-color", "darkgrey");
            $filler.css("width", "50%");
            $opt1.css("display", "inline-block");
            $opt2.css("display", "inline-block");
            $opt1.find("span.tag").html("Top:");
            $opt1.find("span.value").html(top + "px");
            $opt2.find("span.tag").html("Left:");
            $opt2.find("span.value").html(left + "px");
        },
        drag: function (event, ui) {
            var top = Math.round(ui.position.top * 100) / 100;
            var left = Math.round(ui.position.left * 100) / 100;
            $opt1.find("span.value").html(top + "px");
            $opt2.find("span.value").html(left + "px");
        },
        stop: function () {
            $("div#vied-main").css("background-color", "#6DBDD6");
            $filler.width("100%");
            $opt1.css("display", "none");
            $opt2.css("display", "none");
            $opt1.find("span.tag").html(" ");
            $opt1.find("span.value").html(" ");
            $opt2.find("span.tag").html(" ");
            $opt2.find("span.value").html(" ");
        }
    });
});

Template.toolbar.helpers({
    data: function(){
        "use strict";
        return eDefaultsDB.find({}, {fields: {type: 1, img: 1, label: 1}, sort: {_id: 1}});
    }
});

Template.toolbar.events({
    "click button#vied-show-opt": function () {
        "use strict";
        var $modal = $("div#vied-modal");
        $modal.find("div.modal-dialog").addClass("modal-lg");
        $modal.modal("show");
    }
});