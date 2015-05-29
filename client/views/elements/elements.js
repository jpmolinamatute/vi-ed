/* global elementsDB:false*/

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
            elementsDB.update({_id: id}, {$set: {"style.width": width, "style.height": height}});
        }
    });
}

function setDraggable(element, id) {
    "use strict";

    element.draggable({
        containment: "parent",
        handle: "div.element-draggable",
        stop: function (event, ui) {
            var left = ui.position.left + "px";
            var top = ui.position.top + "px";
            elementsDB.update({_id: id}, {$set: {"style.top": top, "style.left": left}});
        }
    });
}

function cleanUp($element) {
    "use strict";

    if ($element.resizable("instance")) {
        $element.resizable("destroy");
        console.log("un elemento resizable detruido");
    }

    if ($element.draggable("instance")) {
        $element.draggable("destroy");
        console.log("un elemento draggable detruido");
    }
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

        elementsDB.update({_id: this._id}, {$set: {shown: false}});
    },
    "click div.element-container div.element-toolbar button.copy": function () {
        "use strict";

        var element = elementsDB.findOne({_id: this._id});
        var left = parseInt(element.style.left, 10) * 2;
        element.style.left = left + "px";
        delete element._id;
        elementsDB.insert(element);
    },
    "click div.element-container div.element-toolbar button.move": function () {
        "use strict";

        var section = elementsDB.findOne({_id: this._id}, {fields: {sectionID: 1}}).sectionID;
        var $next = $("section#" + section).next("section.sections");

        if ($next.length) {
            elementsDB.update({_id: this._id}, {$set: {sectionID: $next.attr("id")}});
        } else {
            console.warn("There is not section below");
        }

    },
    "click div.element-container div.element-toolbar button.options": function () {
        "use strict";

        var $optContainer = $("div#opt-container");
        $optContainer.css("display", "block");
    }
});

Template.elements.onDestroyed(function () {
    "use strict";

    var $element = $("div#" + this.data._id);

    if ($element.length === 1) {
        cleanUp($element);
    } else if ($element.length > 1) {
        $element.each(function (key, value) {
            cleanUp($(value));
        });
    }

});