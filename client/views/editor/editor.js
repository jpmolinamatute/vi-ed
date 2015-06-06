/* global sectionsDB:false*/
/* global pagesDB:false*/
/* global elementOpt: true*/

elementOpt = null;

function closeOptContainer() {
    "use strict";
    var $optContainer = $("div#opt-container");

    $optContainer.css("display", "none");

    if (elementOpt) {
        Blaze.remove(elementOpt);
        elementOpt = null;
    }

}

Template.editor.helpers({
    sections: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];

        var height = ($(window).height() - 30) / 3;
        var newSections;
        var result;
        if (id) {
            newSections = {
                owner: Meteor.userId(),
                created: new Date(),
                type: "head",
                pageID: id,
                shown: true,
                index: 1,
                fullwidth: true,
                sharedWith: [],
                style: {
                    height: height + "px"
                }
            };
            if (!sectionsDB.find({pageID: id}).count()) {
                sectionsDB.insert(newSections);
                newSections.type = "body";
                newSections.index = 2;
                sectionsDB.insert(newSections);
                newSections.type = "footer";
                newSections.index = 3;
                sectionsDB.insert(newSections);
            }
            result = sectionsDB.find({pageID: id}).fetch();
        }

        return result;
    },
    style: function () {
        "use strict";
        var id = window.location.pathname.split("/editor/")[1];
        var result = "";
        if (id && pagesDB.find({_id: id}).count()) {
            result = pagesDB.findOne({_id: id}, {fields: {style: 1}}).style;
        }
        return result;
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

Template.editor.events({
    "click button#opt-close, click div#opt-container": function () {
        "use strict";

        closeOptContainer();
    },
    "click div#element-opt": function(event){
        "use strict";
        event.stopPropagation();
    }
});

Template.editor.onRendered(function () {
    "use strict";

});