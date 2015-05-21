Router.route("/editor/:_id", function () {
    "use strict";
    this.subscribe("pages");
    this.subscribe("sections");
    this.subscribe("elements").wait();

    if (this.ready()) {
        if (this.params._id) {
            this.render("editor");
        } else {
            this.redirect("/dashboard");
        }

    } else {
        this.render("loading");
    }
});


Router.route("/dashboard", function () {
    "use strict";

    this.subscribe("pages");
    if (this.ready()) {
        this.render();
    } else {
        this.render("loading");
    }
});