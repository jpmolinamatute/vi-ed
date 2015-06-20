/* global elementsDB: false*/
/* global sectionsDB: false*/
/* global eDefaultsDB: false*/
/* global validateColorHex: false*/

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
            sectionsDB.update({_id: id}, {$set: {"height": height}});
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

Template.sectionOptions.events({
    "change input[name='fullwidth']": function (event) {
        "use strict";
        var myBool = $(event.currentTarget).is(":checked");
        sectionsDB.update({_id: this._id}, {$set: {"fullwidth": myBool}});
    }
});

Template.sectionOptions.helpers({
    checkfullwidth: function () {
        "use strict";
        return sectionsDB.findOne({_id: this._id}, {fields: {fullwidth: 1}}).fullwidth;
    },
    bgColor: function () {
        "use strict";
        return sectionsDB.findOne({_id: this._id}, {fields: {"style.background-color": 1}}).style["background-color"];
    }
});

Template.sectionOptions.events({
    "change input.bg-color": function (event) {
        "use strict";

        var color = $(event.currentTarget).val();

        if (validateColorHex.test(color)) {
            console.log(this._id, color);
            sectionsDB.update({_id: this._id}, {$set: {style: {"background-color": color}}});
        }
    }
});