/* global pagesDB:false*/

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
            Router.go("/editor/" + pageId);
        }
    },
    "change select#vied-pageslist": function (event) {
        "use strict";
        var $select = $(event.currentTarget);
        Router.go("/editor/" + $select.val());
    }
});

Template.dashboard.helpers({
    pages: function () {
        "use strict";

        return pagesDB.find().fetch();
    }
});