"use strict";
Template.editor.helpers({});

Template.editor.rendered = function () {
    var position = $("#vied-toolbar").height();
    var sections = $("#vied-editor").find("section.sections");
    var spaceWindow = $(window).height() - position;
    $("#vied-editor").height(spaceWindow);
    var height = (spaceWindow - 10) / sections.length;

    sections.height(height);
    sections.each(function (key, value) {
        $(value).css("top", position + "px");
    });
};
