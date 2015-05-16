/* global sectionsDB:false*/

Template.editor.helpers({
    sections: function () {
        "use strict";
        var id = Session.get("pageId");
        var sectionData = {};
        var newSections = {
            owner: Meteor.userId(),
            created: new Date(),
            type: "head",
            pageID: id,
            shown: true,
            sharedWith: []
        };

        if (!sectionsDB.find({pageID: id}).count()) {
            sectionData.type = "head";
            sectionData._id = sectionsDB.insert(newSections);

            newSections.type = "body";
            sectionData.type = "body";
            sectionData._id = sectionsDB.insert(newSections);

            newSections.type = "footer";
            sectionData.type = "footer";
            sectionData._id = sectionsDB.insert(newSections);
        }

        return sectionsDB.find({pageID: id}, {fields: {_id: 1, type: 1}}).fetch();
    }
});


