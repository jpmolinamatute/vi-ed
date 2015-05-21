/* global sectionsDB:false*/

Template.editor.helpers({
    sections: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];
        var height = ($(window).height() - 30) / 3; // @FIXME: 30 is height of toolbar, I should get this dynamically
        var newSections = {
            owner: Meteor.userId(),
            created: new Date(),
            type: "head",
            pageID: id,
            shown: true,
            sharedWith: [],
            style: {
                height: height + "px"
            }
        };

        if (!sectionsDB.find({pageID: id}).count()) {
            sectionsDB.insert(newSections);
            newSections.type = "body";
            sectionsDB.insert(newSections);
            newSections.type = "footer";
            sectionsDB.insert(newSections);
        }

        return sectionsDB.find({pageID: id}, {fields: {_id: 1, type: 1, style: 1}}).fetch();
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
