"use strict";

var setDroppable = function (sections) {
    sections.droppable({
        accept: "div.tools",
        drop: function (event, ui) {
            var myTemplate = ui.draggable.attr("data-type");
            var mySeccion = document.getElementById($(this).attr("id"));
            if (typeof Template[myTemplate] === "undefined") {
                console.error(myTemplate + " is undefined");
            } else {
                Blaze.render(Template[myTemplate], mySeccion);
            }
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

Template.section.rendered = function () {
    var sections = this.$("section.sections");
    setResizable(sections);
    setDroppable(sections);
};

Template.section.helpers({
    data: [
        {id: "vied-header", type: "header"},
        {id: "vied-body", type: "body"},
        {id: "vied-footer", type: "footer"}
    ]
});


