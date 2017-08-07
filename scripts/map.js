function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display map
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Markers
    var markers = [
    ['McCarter Theater, Princeton'],
    ['Lewis Center for the Arts'],
    ['LOT 22 Princeton']
    ];

    var marker, i, geocoder = new google.maps.Geocoder();

    // Loop through array and place markers
    for(i = 0; i < markers.length; i++) {
        var address = markers[i][0];
        geocoder.geocode({'address' : address}, function(results, status) {
            if (status === 'OK') {
                map.setCenter(results[0].geometry.location);
                marker = new google.maps.Marker({
                    map: map,
                    position :results[0].geometry.location
                });
            } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });

        map.fitBounds(bounds);
    }

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });
}