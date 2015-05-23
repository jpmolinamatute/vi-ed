
function setResizabble(element, id) {
    "use strict";
    element.resizable({
        handles: {
            n: "div.ui-resizable-n",
            e: "div.ui-resizable-e",
            s: "div.ui-resizable-s",
            w: "div.ui-resizable-w",
            ne: "div.ui-resizable-ne",
            se: "div.ui-resizable-se",
            sw: "div.ui-resizable-sw",
            nw: "div.ui-resizable-nw"
        },
        stop: function (event, ui) {
            var width = ui.size.width + "px";
            var height = ui.size.height + "px";
            Meteor.call("elementUpsert", {_id: id}, {$set: {"style.width": width, "style.height": height}});
        }
    });
}

function setDraggable(element, id) {
    "use strict";

    element.draggable({
        containment: "section.sections",
        handle: "div.element-draggable",
        stop: function (event, ui) {
            var left = ui.position.left + "px";
            var top = ui.position.top + "px";
            Meteor.call("elementUpsert", {_id: id}, {$set: {"style.top": top, "style.left": left}});
        }
    });
}

Template.elements.onRendered(function () {
    "use strict";

    var element = this.$("div.element-container");
    setResizabble(element, this.data._id);
    setDraggable(element, this.data._id);
});

Template.elements.helpers({});

Template.elements.events({
    "dblclick div.element-container div.element-draggable": function (event) {
        "use strict";

        var $element = $(event.currentTarget);

        $element.css({
            width: "0px",
            height: "0px"
        });

    },
    "click div.element-container div.element-toolbar button.remove": function () {
        "use strict";

        Meteor.call("elementUpsert", {_id: this._id}, {$set: {shown: false}});
    }
});
