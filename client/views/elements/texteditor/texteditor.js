/* global tinymce:false*/
/* global elementsDB:false*/

var editorManagerloaded = false;
function createTEditor(id) {
    "use strict";

    var editorOpt = {
        inline: true,
        selector: "div#texteditor-" + id,
        theme: "modern",
        auto_focus: "texteditor-" + id,
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
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
        image_advtab: true
    };
    var $mainToolbar = $("ul#vied-toolbar");
    var $secondaryToolbar = $("div#vied-second-toolbar");

    var ed = new tinymce.Editor("texteditor-" + id, editorOpt, tinymce.EditorManager);

    ed.on("blur", function (e) {
        var myContent = ed.getContent();
        if (!$mainToolbar.is(":visible") && $secondaryToolbar.is(":visible")) {
            $secondaryToolbar.hide("blind", {}, 500, function () {
                $mainToolbar.show("blind", {}, 500);
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
        if ($mainToolbar.is(":visible") && !$secondaryToolbar.is(":visible")) {
            $mainToolbar.hide("blind", {}, 500, function () {
                $secondaryToolbar.show("blind", {}, 500);
            });
        }
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