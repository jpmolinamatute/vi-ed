"use strict";
var setDroppable = function (sections) {
    sections.droppable({
            accept: "div.tools",
            drop: function (event, ui) {
                var myTemplate = ui.draggable.attr("data-type");
                var mySeccion = $(this).attr("id");
                if (typeof Template[myTemplate] === "undefined") {
                    console.error(myTemplate + " is undefined");
                } else {
                    var element = {
                        type: myTemplate,
                        subtemplate: mySeccion,
                        created: new Date()
                    };
                    var thisTop = $(this).offset().top;
                    elementsDB.insert(element,
                        function (error, id) {
                            if (error) {
                                throw ("Failed to write " + JSON.stringify(element) + " into DB", error);
                            }
                            if (id) {
                                var data = {
                                    mydata: {
                                        id: id,
                                        left: ui.offset.left - $("#vied-editor").offset().left,
                                        top: ui.offset.top - thisTop
                                    }
                                };
                                elementsObj[id] = Blaze.renderWithData(Template[myTemplate], data, $("#" + mySeccion)[0]);
                            }
                        });
                }
            }
        }
    )
    ;
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