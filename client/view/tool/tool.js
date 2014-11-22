"use strict";
Template.tool.rendered = function () {
    var tools = this.$("div.tools");
    tools.draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100
    });
    //@TODO fix this!
    //var myWidth = 0;
    //tools.each(function (key, value) {
    //    console.log(key, myWidth);
    //    myWidth += $(value).outerWidth(true);
    //});
    //
    //console.log(myWidth);
    //$(this.find("ul")).width(myWidth);
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