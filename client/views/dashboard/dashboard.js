/* global pagesDB:false*/

Template.dashboard.events({
    "click button#create-page-id": function () {
        "use strict";

        var pageId;
        var data = {
            title: $("input#vied-create-page").val(),
            owner: Meteor.userId(),
            created: new Date(),
            category: null,
            sharedWith: [],
            style: {}
        };

        if (data.title && data.owner) {
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

        return pagesDB.find({}, {fields: {title: 1}}).fetch();
    }
});