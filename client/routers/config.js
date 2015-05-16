Router.configure({
    loadingTemplate: "loading",
    notFoundTemplate: "notfound",
    layoutTemplate: "main"
});

Router.onBeforeAction(function () {
    "use strict";

    // all properties available in the route function
    // are also available here such as this.params

    if (!Meteor.userId()) {
        // if the user is not logged in, render the Login template
        this.render("login");
    } else {
        // otherwise don't hold up the rest of hooks or our route/action function
        // from running
        this.next();
    }
});