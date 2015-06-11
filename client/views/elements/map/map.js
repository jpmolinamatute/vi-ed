/* global GoogleMaps: false*/
/* global google: false*/
/* global elementsDB: false*/

Template.map.helpers({
    mapName: function () {
        "use strict";

        return "map-" + this._id;
    },
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

    if (!GoogleMaps.loaded()) {
        GoogleMaps.load({key: "AIzaSyCfMqRmnepBNo_3e93FH68QGg7ntNqpBlk"});
    }
});

Template.map.onCreated(function () {
    "use strict";

    var elementID = this.data._id;
    var mapId = "map-" + elementID;
    var markers = {};
    var markerIndex = 0;
    elementsDB.update({_id: elementID}, {$set: {"data.markers": []}});
    GoogleMaps.ready(mapId, function (map) {
        google.maps.event.addListener(map.instance, "click", function (event) {

            console.log(event, event.latLng.lat(), event.latLng.lng());
            elementsDB.update({_id: elementID}, {
                $push: {
                    "data.markers": {
                        "index": markerIndex,
                        "lat": event.latLng.lat(),
                        "lng": event.latLng.lng()
                    }
                }
            });
            markerIndex++;
        });

        elementsDB.find({_id: elementID}, {fields: {data: 1}}).observe({
            added: function (document) {
                // Create a marker for this document
                var marker = new google.maps.Marker({
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.lat, document.lng),
                    map: map.instance,
                    // We store the document _id on the marker in order
                    // to update the document within the 'dragend' event below.
                    id: document._id
                });
                //
                //// This listener lets us drag markers on the map and update their corresponding document.
                //google.maps.event.addListener(marker, 'dragend', function (event) {
                //    Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
                //});
                //
                //// Store this marker instance within the markers object.
                //markers[document._id] = marker;
            },
            changed: function (newDocument, oldDocument) {
                //markers[newDocument._id].setPosition({lat: newDocument.lat, lng: newDocument.lng});
            },
            removed: function (oldDocument) {
                //// Remove the marker from the map
                //markers[oldDocument._id].setMap(null);
                //
                //// Clear the event listener
                //google.maps.event.clearInstanceListeners(
                //    markers[oldDocument._id]);
                //
                //// Remove the reference to this marker instance
                //delete markers[oldDocument._id];
            }
        });
    });
});