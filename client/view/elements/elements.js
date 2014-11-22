"use strict";
var setResizabble = function (element) {
    element.resizable({handles: "all"});
};

var setDraggable = function (element) {
    element.draggable({containment: "parent"});
};

Template.elements.rendered = function () {
    var element = this.$("div.element-container");
    setResizabble(element);
    setDraggable(element);
};

Template.elements.helpers({});
Template.elements.events({});