/* global elementsDB: false*/
function setDroppable(sections) {
    "use strict";

    sections.droppable({
        accept: "div.tools",
        drop: function (event, ui) {
            var type = ui.draggable.attr("data-type");
            if (typeof Template[type] === "undefined") {
                console.error(type + " is undefined");
            } else {
                var element = {
                    type: type,
                    sectionID: sections.attr("id"),
                    created: new Date(),
                    shown: true,
                    style: {
                        width: "200px",
                        height: "200px"
                    }
                };

                elementsDB.insert(element);
            }
        }
    });
}

function setResizable(sections) {
    "use strict";

    sections.resizable({
        handles: {s: "div.divisors"}
    });
}

Template.section.rendered = function () {
    "use strict";

    var $sections = this.$("section.sections");
    setResizable($sections);
    setDroppable($sections);
};

Template.section.helpers({
    myElements: function () {
        "use strict";

        var myId = this._id;
        return elementsDB.find({sectionID: myId}).fetch();
    }
});