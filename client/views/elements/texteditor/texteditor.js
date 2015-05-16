Template.texteditor.rendered = function () {
    "use strict";
    var id = "#" + $(this.find("div.element-container")).attr("id") + " div.vied-texteditor";
    tinymce.init({
        selector: id,
        //auto_focus: id,
        inline: true,
        menubar: false
    });
};