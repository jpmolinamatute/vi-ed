"use strict";
Template.editor.helpers({
});

Template.editor.rendered = function () {
    var position = $("#vied-toolbar").height();
    var sections = $("#vied-editor").find("section.sections");
    var height = ($(window).height() - position - 10) / sections.length;
    sections.height(height);
    sections.each(function (key, value) {
        $(value).css("top", position + "px");
    });
};
