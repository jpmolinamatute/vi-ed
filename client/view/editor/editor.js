"use strict";
Template.editor.helpers({});

Template.editor.rendered = function () {
    var $editor = $("#vied-editor");
    var position = $("#vied-toolbar").height();
    var sections = $editor.find("section.sections");
    var spaceWindow = $(window).height() - position;
    $editor.height(spaceWindow);
    $editor.css("top", position + "px");
    var height = spaceWindow / sections.length;
    sections.height(height);
};
