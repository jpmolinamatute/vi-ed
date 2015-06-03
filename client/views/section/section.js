/* global elementsDB: false*/
/* global sectionsDB: false*/
/* global eDefaultsDB: false*/

function getElementDefault(type) {
    "use strict";

    return eDefaultsDB.findOne({"_id": type});
}

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
                var defaultValue = getElementDefault(type);
                var element = {
                    type: type,
                    sectionID: $sections.attr("id"),
                    created: new Date(),
                    shown: true,
                    owner: Meteor.userId(),
                    active: true,
                    style: {
                        width: defaultValue.style.width,
                        height: defaultValue.style.height,
                        top: top,
                        left: left,
                        "z-index": "1"
                    }
                };

                if (defaultValue.data) {
                    element.data = defaultValue.data;
                }
                var currentActive = $("div#vied-editor").find("div.element-active").attr("id");
                elementsDB.update({"_id": currentActive}, {"$set": {"active": false}});
                elementsDB.insert(element);
            }
        }
    });
}

function setResizable($sections, id) {
    "use strict";

    $sections.resizable({
        handles: {s: "div.ui-resizable-s"},
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
    }
});

Template.section.events({
    "click section.sections": function () {
        "use strict";

        var currentActive = $("div#vied-editor").find("div.element-active").attr("id");
        elementsDB.update({"_id": currentActive}, {"$set": {"active": false}});
    }
});