"use strict";
var setResizabble = function (element) {
    var hands = {
        n: "div.ui-resizable-n",
        e: "div.ui-resizable-e",
        s: "div.ui-resizable-s",
        w: "div.ui-resizable-w",
        ne: "div.ui-resizable-ne",
        se: "div.ui-resizable-se",
        sw: "div.ui-resizable-sw",
        nw: "div.ui-resizable-nw"
    };
    // @FIXME: remove $() and element sinse isn't needed
    element.resizable({
        handles: hands
    });
};

var setDraggable = function (element) {
    element.draggable({
        containment: "parent",
        handle: "div.element-draggable"
    });
};

Template.elements.rendered = function () {
    var element = this.$("div.element-container");
    setResizabble(element);
    setDraggable(element);
};

Template.elements.helpers({});
Template.elements.events({
    'dblclick div.element-container div.element-draggable': function (event) {
        var $element = $(event.currentTarget);

        $element.css({
            width: "0px",
            height: "0px"
        });

        $element.closest("div.element-container").children("div[data-content='true']").focus();
        // @TODO: re-enable "div.element-draggable" when element lose focus
    }
});
