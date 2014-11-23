"use strict";
var setResizabble = function (element) {
    var hands = {
        n: $("div.ui-resizable-n", element),
        e: $("div.ui-resizable-e", element),
        s: $("div.ui-resizable-s", element),
        w: $("div.ui-resizable-w", element),
        ne: $("div.ui-resizable-ne", element),
        se: $("div.ui-resizable-se", element),
        sw: $("div.ui-resizable-sw", element),
        nw: $("div.ui-resizable-nw", element)
    };

    element.resizable({handles: hands});
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
Template.elements.events({});