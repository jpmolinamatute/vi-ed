/* global pagesDB:false*/
Session.setDefault("pageId", null);
Template.dashboard.events({
    "click button#create-page-id": function (event) {
        "use strict";

        var title = $("input#vied-create-page").val();
        var pageId;
        var data = {
            owner: Meteor.userId(),
            created: new Date(),
            category: null,
            sharedWith: []
        };

        if (title && data.owner) {
            data.title = title;
            pageId = pagesDB.insert(data);
            Session.set("pageId", pageId);
            Router.go("/editor");
        }
    }
});
