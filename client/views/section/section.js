/* global elementsDB: false*/
/* global sectionsDB: false*/

function setDroppable($sections) {
    "use strict";

    $sections.droppable({
        accept: "div.tools",
        drop: function (event, ui) {
            var type = ui.draggable.attr("data-type");
            if (typeof Template[type] === "undefined") {
                console.error(type + " is undefined");
            } else {
                var top = (ui.position.top - $sections.offset().top) + "px";
                var left = (ui.position.left - $sections.offset().left) + "px";
                var element = {
                    type: type,
                    sectionID: $sections.attr("id"),
                    created: new Date(),
                    shown: true,
                    owner: Meteor.userId(),
                    style: {
                        width: "200px",
                        height: "200px",
                        top: top,
                        left: left,
                        "z-index": "1"
                    }
                };

                elementsDB.insert(element);
            }
        }
    });
}

function setResizable($sections, id) {
    "use strict";

    $sections.resizable({
        handles: {s: "div.divisors"},
        stop: function (event, ui) {
            var height = ui.size.height + "px";
            sectionsDB.update({_id: id}, {$set: {"style.height": height}});
        }
    });
}

Template.section.onRendered(function () {
    "use strict";

    var $sections = this.$("section.sections");
    setResizable($sections, this.data._id);
    setDroppable($sections);
});

Template.section.helpers({
    myElements: function () {
        "use strict";

        return elementsDB.find({sectionID: this._id, shown: true}).fetch();
    },
    data: function () {
        "use strict";

        return sectionsDB.findOne({_id: this._id});
    }
});