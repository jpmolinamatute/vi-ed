Template.editor.helpers({
    tools: [
        {
            id: "vied-tool-container",
            type: "container",
            src: "/btn-container.png",
            name: "Container"
        },
        {
            id: "vied-tool-anchor",
            type: "anchor",
            src: "/btn-anchor.png",
            name: "Anchor"
        },
        {
            id: "vied-tool-image",
            type: "image",
            src: "/btn-image.png",
            name: "Image"
        },
        {
            id: "vied-tool-map",
            type: "map",
            src: "/btn-maps.png",
            name: "Map"
        },
        {
            id: "vied-tool-shapes",
            type: "shapes",
            src: "/btn-shapes.png",
            name: "Shapes"
        },
        {
            id: "vied-tool-text-editor",
            type: "text-editor",
            src: "/btn-text-editor.png",
            name: "Text Editor"
        },
        {
            id: "vied-tool-video",
            type: "video",
            src: "/btn-video.png",
            name: "Video"
        }
    ],
    sections: [
        {id: "vied-header", type: "header"},
        {id: "vied-body", type: "body"},
        {id: "vied-footer", type: "footer"}
    ]
});

Template.editor.rendered = function () {
    var position = $("#vied-toolbar").height();
    var sections = $("#vied-editor").find("section.sections");
    var height = ($(window).height() - position - 10) / sections.length;
    sections.height(height);
    sections.each(function (key, value) {
        $(value).css("top", position + "px");
    });
    setResizable(sections);
    setDroppable(sections);
};

var setDroppable = function (sections) {
    sections.droppable({
        accept: "div.tools",
        drop: function () {
            console.log("dropped");
        }
    });
}

var setResizable = function (sections) {
    sections.each(function () {
        var that = $(this);
        var id = "#" + that.attr("id");
        that.resizable({
            handles: {s: "div.divisors"}
        });
    });
}