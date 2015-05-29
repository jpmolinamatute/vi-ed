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
    data: [
        {
            type: "anchor",
            img: "fa-anchor",
            label: "Anchor"
        },
        {
            type: "image",
            img: "fa-picture-o",
            label: "Image"
        },
        {
            type: "map",
            img: "fa-map-marker",
            label: "Map"
        },
        {
            type: "shape",
            img: "fa-file-image-o",
            label: "Shape"
        },
        {
            type: "texteditor",
            img: "fa-file-text-o",
            label: "Text Editor"
        },
        {
            type: "video",
            img: "fa-video-camera",
            label: "Video"
        }
    ]
});