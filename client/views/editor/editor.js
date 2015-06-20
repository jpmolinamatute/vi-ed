/* global sectionsDB:false*/
/* global pagesDB:false*/
/* global validateColorHex: true*/

validateColorHex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;


Template.editor.helpers({
    sections: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];
        var newSections;
        var result = {};
        if (id) {
            newSections = {
                owner: Meteor.userId(),
                created: new Date(),
                type: "section-0",
                pageID: id,
                shown: true,
                index: 0,
                fullwidth: true,
                sharedWith: [],
                height: "400px",
                style: {}
            };
            if (!sectionsDB.find({pageID: id}).count()) {
                sectionsDB.insert(newSections);
                newSections.type = "section-1";
                newSections.index = 1;
                sectionsDB.insert(newSections);
                newSections.type = "section-2";
                newSections.index = 2;
                sectionsDB.insert(newSections);
            }
            result = sectionsDB.find({pageID: id}, {sort: {index: 1}}).fetch();
        }

        return result;
    },
    style: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];
        var result = "";
        if (id && pagesDB.find({
                _id: id
            }).count()) {
            result = pagesDB.findOne({
                _id: id
            }, {
                fields: {
                    style: 1
                }
            }).style;
        }
        return result;
    },
    id: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];
        return id ? id : false;
    }
});

Template.registerHelper("getstyle", function (style) {
    "use strict";
    var myStyles = "";

    if (typeof style === "object") {
        $.each(style, function (key, value) {

            myStyles += key + ": " + value + "; ";
        });
    } else {
        console.error("ERROR: no styles for ", style);
    }

    return myStyles;
});

Template.editor.events({});

Template.editor.onRendered(function () {
    "use strict";

});

Template.editorOptions.onRendered(function () {
    "use strict";

    // for more info : https://github.com/PitPik/tinyColorPicker
    //$("input#vied-editor-corlor-bg").colorPicker();
});

Template.editorOptions.helpers({
    bgColor: function () {
        "use strict";
        return pagesDB.findOne({_id: this._id}, {fields: {"style.background-color": 1}}).style["background-color"];
    }
});

Template.editorOptions.events({
    "change input#vied-editor-corlor-bg": function (event) {
        "use strict";

        var color = $(event.currentTarget).val();

        if (validateColorHex.test(color)) {
            pagesDB.update({_id: this._id}, {$set: {style: {"background-color": color}}});
        }
    }
});