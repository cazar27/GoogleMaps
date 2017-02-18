
      var directionsService = new google.maps.DirectionsService();
      var comienzo             = new google.maps.LatLng(50.995093,-16.417091);
      var fin                  = new google.maps.LatLng(50.997698,-16.41788);
      var distancia            = google.maps.geometry.spherical.computeDistanceBetween(comienzo, fin);

      var request = {
        origin:comienzo,
        destination:final,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          alert("todo bien");
        }
      });
