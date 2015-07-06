/* global pagesDB: false*/

Router.route("/", function () {
    "use strict";
    this.redirect("/dashboard");
});

Router.route("/editor/:_id", function () {
    "use strict";
    this.subscribe("pages");
    this.subscribe("sections");
    this.subscribe("eDefaults");
    this.subscribe("elements").wait();

    if (this.ready()) {
        if (this.params._id) {
            if (pagesDB.find({_id: this.params._id}).count()) {
                this.render("editor");
            } else {
                this.render("notfound");
            }

        } else {
            this.redirect("/dashboard");
        }

    } else {
        this.render("loading");
    }
});

Router.route("/editor");

Router.route("/dashboard", function () {
    "use strict";

    this.subscribe("uploads");
    this.subscribe("pages").wait();
    if (this.ready()) {
        this.render();
    } else {
        this.render("loading");
    }
});