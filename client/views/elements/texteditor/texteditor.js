/* global tinymce:false*/

Template.texteditor.rendered = function () {
    "use strict";
    var $secondToolbar = $("div#vied-second-toolbar");
    $("ul#vied-toolbar").toggle("blind", {}, 500, function(){
        $secondToolbar.toggle("blind", {}, 500);
    });
    tinymce.init({
        inline: true,
        selector: "div#texteditor-" + this.data._id,
        theme: "modern",
        auto_focus:"texteditor-" + this.data._id,
        fixed_toolbar_container: "div#vied-second-toolbar",
        visual: false,
        menubar: false,
        schema: "html5",
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
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        toolbar2: "print preview media | forecolor backcolor emoticons",
        image_advtab: true,
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ]
    });
};