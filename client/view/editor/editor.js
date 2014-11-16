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
    var divisors = $("#vied-editor").find("div.divisors");
    var divisorsHeight = $(divisors[0]).height() * divisors.length;
    var height = ($(window).height() - position - divisorsHeight - 8) / sections.length;
    sections.height(height);

    $(sections).each(function (key, value) {
        $(value).css("top", position + "px");
        position += height;
        $(divisors[key]).css("top", position + "px");
        position += $(divisors[key]).height();
    });
    setResizable();
    setDroppable();

};

var setDroppable = function(){
    var section = $("#vied-editor").find("section.sections");
    section.droppable({
        accept: "div.tools",
        drop: function () {
            console.log("dropped");
        }
    });
}

var setResizable = function(){
    var divisors = $("#vied-editor").find("div.divisors");
    var section = "";
    var sectionHeight = 0;
    var initialTop = 0;
    var otherSections = "";
    var otherTops = [];
    var otherDivisors = "";
    var divisorsTops = [];
    divisors.draggable({
        axis: "y",
        handle: "div.div-left, div.div-right",
        start: function (event, ui) {
            section = $("#" + $(ui.helper).attr("data-id"));
            sectionHeight = section.height();
            initialTop = ui.position.top;
            otherDivisors = $("#vied-editor").find(ui.helper).nextAll("div.divisors");
            otherSections = $("#vied-editor").find(section).nextAll("section.sections");
            otherSections.each(function(key, value){
                otherTops[key] = $(value).position().top;
                divisorsTops[key] = $(otherDivisors[key]).position().top;
            });
        },
        drag: function (event, ui) {
            var diff = ui.position.top - initialTop;
            section.height(sectionHeight + diff);
            otherSections.each(function(key, value){
                mytop = (otherTops[key] + diff) + "px";
                $(value).css("top", mytop);
                mytop = (divisorsTops[key] + diff) + "px";
                $(otherDivisors[key]).css("top", mytop);
            });
        },
        stop: function (event, ui) {
            //console.log(divisorsTops);
        }
    });
}