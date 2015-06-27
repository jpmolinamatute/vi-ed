/* global tinymce:false*/
/* global elementsDB:false*/

var editorManagerloaded = false;
function createTEditor(id) {
    "use strict";
    //auto_focus: "texteditor-" + id, since we are going to have many texteditor,
    // and we don't know if the user is going to use them all we don't set this attribute

    var editorOpt = {
        inline: true,
        selector: "div#texteditor-" + id,
        theme: "modern",
        fixed_toolbar_container: "div#vied-second-toolbar",
        visual: false,
        menubar: false,
        schema: "html5-strict",
        width: 720,
        height: 68,
        browser_spellcheck: true,
        custom_undo_redo_levels: 10,
        resize: "both",
        paste_use_dialog: false,
        paste_auto_cleanup_on_paste: true,
        paste_convert_headers_to_strong: false,
        paste_strip_class_attributes: "all",
        paste_remove_spans: true,
        paste_remove_styles: true,
        paste_retain_style_properties: "",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern"
        ],
        toolbar1: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | preview | forecolor backcolor emoticons",
        image_advtab: true
    };
    var $mainToolbar = $("ul#vied-toolbar");
    var $secondaryToolbar = $("div#vied-second-toolbar");

    var ed = new tinymce.Editor("texteditor-" + id, editorOpt, tinymce.EditorManager);

    ed.on("blur", function (e) {
        var myContent = ed.getContent();
        if (!$mainToolbar.is(":visible") && $secondaryToolbar.is(":visible")) {
            $secondaryToolbar.hide("blind", {}, 50, function () {
                $mainToolbar.show("blind", {}, 50);
            });
        }

        elementsDB.update({_id: id}, {$set: {"content": myContent}});
        e.stopPropagation();
    });
    ed.on("deactivate", function (e) {
        var myContent = ed.getContent();
        elementsDB.update({_id: id}, {$set: {"content": myContent}});
        e.stopPropagation();
    });
    ed.on("focus", function (e) {

        e.stopPropagation();
    });
    ed.render();
}

function setCotent(id, content) {
    "use strict";

    if (content !== "") {
        $("div#texteditor-" + id).html(content);
    }
}

Template.texteditor.onCreated(function () {
    "use strict";

    if (!editorManagerloaded) {
        editorManagerloaded = true;
        tinymce.EditorManager.init({});
    }
});

Template.texteditor.rendered = function () {
    "use strict";

    setCotent(this.data._id, this.data.content);
    createTEditor(this.data._id);
};

Template.texteditor.helpers({});