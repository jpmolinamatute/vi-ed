Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "notfound",
    layoutTemplate: "main"
});

Router.onBeforeAction(function () {
    "use strict";

    if (!Meteor.userId()) {
        this.render("login");
    } else {
        this.next();
    }
});