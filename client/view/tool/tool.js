"use strict";
Template.tool.rendered = function () {
    var tools = this.$("div.tools");
    tools.draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100,
        start: function (event, ui) {
            $("html, body").css("background-color", "darkgrey");
        },
        stop: function (event, ui) {
            $("html, body").css("background-color", "white");
        }
    });
    $(this.find("ul")).width(53 * tools.length);
};

Template.tool.helpers({
    data: [
        {
            type: "container",
            src: "/btn-container.png",
            name: "Container"
        },
        {
            type: "anchor",
            src: "/btn-anchor.png",
            name: "Anchor"
        },
        {
            type: "image",
            src: "/btn-image.png",
            name: "Image"
        },
        {
            type: "map",
            src: "/btn-map.png",
            name: "Map"
        },
        {
            type: "shape",
            src: "/btn-shape.png",
            name: "Shape"
        },
        {
            type: "texteditor",
            src: "/btn-text-editor.png",
            name: "Text Editor"
        },
        {
            type: "video",
            src: "/btn-video.png",
            name: "Video"
        }
    ]
});