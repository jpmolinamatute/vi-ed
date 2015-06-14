/* global modalBody: true*/
/* global modalFooter: true*/

modalBody = null;
modalFooter = null;

Template.modal.helpers({});

Template.modal.events({
    "hidden.bs.modal": function () {
        "use strict";

        var $modal = $("div#vied-modal");

        $modal.find("modal-dialog").removeClass("modal-lg modal-sm");
        $("div#vied-modal-footer").removeClass("hidden");
        if (modalBody) {
            Blaze.remove(modalBody);
            modalBody = null;
        }
        if (modalFooter) {
            Blaze.remove(modalFooter);
            modalFooter = null;
        }


    }
});

Template.modal.onRendered(function () {
    "use strict";
});
