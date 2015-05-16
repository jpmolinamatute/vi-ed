/* global elementsDB:false*/
function setResizabble(element) {
    "use strict";
    // @FIXME: remove $() and element sinse isn't needed
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
        }
    });
}

function setDraggable(element) {
    "use strict";

    element.draggable({
        containment: "parent",
        handle: "div.element-draggable"
    });
}

Template.elements.rendered = function () {
    "use strict";

    var element = this.$("div.element-container");
    setResizabble(element);
    setDraggable(element);
};

Template.elements.helpers({
    getstyle: function (style) {
        "use strict";
        var myStyles = "";
        var stylesKeys;

        if (typeof style === "object") {
            stylesKeys = Object.keys(style);
            $.each(stylesKeys, function (key, value) {
                myStyles += key + ": " + value + "; ";
            });
        } else {
            console.error("ERROR: no styles for"); //, this.data._id
        }
        return myStyles;
    }
});

Template.elements.events({
    'dblclick div.element-container div.element-draggable': function (event) {
        "use strict";

        var $element = $(event.currentTarget);

        $element.css({
            width: "0px",
            height: "0px"
        });

        $element.closest("div.element-container").children("div[data-content='true']").focus();
        // @TODO: re-enable "div.element-draggable" when element lose focus
    }
});
