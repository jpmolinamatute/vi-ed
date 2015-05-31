/*global elementsDB: false*/
/*global sectionsDB: false*/
/*global pagesDB: false*/
/*global eDefaultsDB: false*/

var opt = {
    insert: function (userId) {
        "use strict";

        return userId;
    },
    update: function (userId, doc) {
        "use strict";

        return doc.owner === userId;
    },
    remove: function (userId, doc) {
        "use strict";

        return doc.owner === userId;
    }
};

eDefaultsDB.allow({
    insert: function (userId) {
        "use strict";

        return userId;
    }
});

elementsDB.allow(opt);
sectionsDB.allow(opt);
pagesDB.allow(opt);

Meteor.publish("elements", function () {
    "use strict";

    if (!this.userId) {
        this.ready();
    } else {
        return elementsDB.find();
    }

});

Meteor.publish("sections", function () {
    "use strict";

    if (!this.userId) {
        this.ready();
    } else {
        return sectionsDB.find({owner: this.userId});
    }

});

Meteor.publish("pages", function () {
    "use strict";

    if (!this.userId) {
        this.ready();
    } else {
        return pagesDB.find({owner: this.userId});
    }

});

Meteor.publish("eDefaults", function () {
    "use strict";
    return eDefaultsDB.find();
});