/* global GoogleMaps: false*/
/* global google: false*/

Template.map.helpers({
    opt: function () {
        "use strict";

        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                zoom: 8
            };
        }
    }
});

Template.map.events({});

Template.map.onRendered(function () {
    "use strict";
});
