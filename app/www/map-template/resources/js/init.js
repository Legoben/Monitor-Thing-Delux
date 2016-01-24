'use strict';

(function ($) {
    $(function () {
        $('.button-collapse').sideNav();
    }); // end of document ready
})
(jQuery); // end of jQuery name space


var locmap;
var marker = null;

function geo() {
    navigator.geolocation.getCurrentPosition(function (loc) {
        console.log(loc);
        var latlon = {
            lat: loc.coords.latitude,
            lng: loc.coords.longitude
        }



        console.log(latlon);
        latlon = [38.9283, -77.1753]
        initMap(latlon)
    });
}

function initMap(latlon) {
    var latlon = {
        lat: 38.9283,
        lng: -77.1753
    }

    locmap = new google.maps.Map(document.getElementById('map'), {
        center: latlon,
        zoom: 15
    });

    google.maps.event.addListener(locmap, "click", function (event) {
        var lat = event.latLng.lat();
        var lng = event.latLng.lng();

        var latlon = {
            lat: lat,
            lng: lng
        }

        if (marker != null) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            position: latlon,
            map: locmap,
            title: 'Hello World!'
        });
        // populate yor box/field with lat, lng
        console.log("Lat=" + lat + "; Lng=" + lng);
    });

}
