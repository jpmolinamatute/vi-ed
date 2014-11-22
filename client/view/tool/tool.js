Template.tool.rendered = function () {
    $(this.findAll("div.tools")).draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100
    });
};

Template.tool.helpers({
    data: [
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
            src: "/btn-map.png",
            name: "Map"
        },
        {
            id: "vied-tool-shape",
            type: "shape",
            src: "/btn-shape.png",
            name: "Shape"
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
});