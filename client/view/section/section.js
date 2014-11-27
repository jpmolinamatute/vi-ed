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
                var data = {
                    mydata: {
                        id: elementCount,
                        left: ui.position.left - $("#vied-editor").position().left,
                        top: ui.position.top - $(this).position().top
                    }
                };

                elementsObj[elementCount] = Blaze.renderWithData(Template[myTemplate], data, mySeccion);
                elementCount++;
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