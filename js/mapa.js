
// funcion que inicia el mapa en Fuengirola debido a la lat y la lng con un zoom de 15
// creamos variables de inicio que son el map q usaremos en todo el codigo
// y los markers que seran los puntos del mapa
function initMap() {

  infoGlobalMapa.map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: {lat: 36.540, lng: -4.620}

  });
  compartirUbicacion();
}

function rellenarSelectTapa(){

  var addTap     = document.getElementById('nombre_bares');
  var output     = "";

  addTap.innerHTML     = output;

  for (var i = 0; i < localizaciones.length; i++) {
      output += '<option class="selectLoc" id="selectLoc'+i+'" name="puntos" value="'+ localizaciones[i].nombre+'">'+localizaciones[i].nombre+'</option>';
 }

   addTap.innerHTML     = output;

 }

function rellenarSelect(){

  var selectFin  = document.getElementById('final');
  var output     = "";

  selectFin.innerHTML  = output;

  for (var i = 0; i < localizaciones.length; i++) {
      var cadena ="";
      cadena+=  localizaciones[i].lat+','+localizaciones[i].lng;
      output += '<option class="selectLoc" id="selectLoc'+i+'" name="puntos" value="'+cadena+'">'+localizaciones[i].nombre+'</option>';
  }

  selectFin.innerHTML  = output;

}

// drop sera la funcion que sera llamada para mostrar los puntos del mapa
// lo primero que hacemos es crear los marcadores con la funcion addMarkerWithTimeout
// cojiendo los puntos del array de localizaciones

function drop() {

  clearMarkers();

  for (var i = 0; i < localizaciones.length; i++) {
    addMarkerWithTimeout(localizaciones[i], i * 200);
  }
//  rellenarCheck();
  rellenarSelect();
  rellenarSelectTapa();
}

function dropType(type) {

  clearMarkers();

  for (var i = 0; i < localizaciones.length; i++) {

    if (localizaciones[i].tipo==type) {

      addMarkerWithTimeout(localizaciones[i], i * 200);
    }
  }

}

// la funcion que crea los puntos usa las variables de cada objeto punto compartirUbicacion
// como posicion o el icono

function addMarkerWithTimeout(position, timeout) {

  window.setTimeout(function() {

      var marker;
      marker = new google.maps.Marker({
      position: position,
      map: infoGlobalMapa.map,
      icon: position.icon,
      animation: google.maps.Animation.DROP
    });

    infoGlobalMapa.markers.push(marker);

  (function(marker){
  google.maps.event.addListener(marker,'click',function()
  {
    if(!infoGlobalMapa.infoLocal){

    infoGlobalMapa.infoLocal = new google.maps.InfoWindow();
  }

  var output = "";
  output +="<p class='mini'>Nombre:</p><p class='mini'><b>"+position.nombre+"</b></p>";
  output +="<p class='mini'>Descripcion:</p><p class='mini'><b>"+position.descripcion+"</b></p>";
  output +="<p class='mini'>Foto establecimiento</p><img class='imagenes'' src='"+position.foto+"'>'</p>";
/*
  if (infoGlobalMapa.ubicacionActual) {

    var comienzo             = new google.maps.LatLng(infoGlobalMapa.ubicacionActual.lat,infoGlobalMapa.ubicacionActual.lat);
    var fin                  = new google.maps.LatLng(position.lat,position.lng);
    var distancia            = google.maps.geometry.spherical.computeDistanceBetween(comienzo, fin);

    output +="<br><p class='mini'>distancia</p><p class='mini'><b></b>"+distancia+"<p class='mini'>";

  }
  */
  muestraTapas(position.nombre);

  infoGlobalMapa.infoLocal.setContent(output);
  infoGlobalMapa.infoLocal.open(infoGlobalMapa.map,marker);
  infoGlobalMapa.infos.push(infoGlobalMapa.infoLocal);
  });
  })(marker);

  }, timeout);
}
// esta funcion se usa para borrar los makers si se vuelve a pedir mostrarlos
function clearMarkers() {
  for (var i = 0; i < infoGlobalMapa.markers.length; i++) {
    infoGlobalMapa.markers[i].setMap(null);
  }
  infoGlobalMapa.markers = [];
}

function compartirUbicacion(){

  //Creamos un punto para la ubicacion actual
  // Intentar la geolocalizacion de HTML5.

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
  };

  // Cambiamos la posicion del punto para la ubicaion
  //infoGlobalMapa.ubicacionActual.setPosition(pos);
  //infoGlobalMapa.ubicacionActual.setVisible(true);

  infoGlobalMapa.map.setCenter(pos);

  infoGlobalMapa.ubicacionActual = new google.maps.Marker({

        position: pos,
        map: infoGlobalMapa.map,
        title: 'Usted esta aqui!',
        icon:'img/ubicacion.png'

      });
        infoGlobalMapa.ubicacionActual.addListener('click', function() {

        if (!infoGlobalMapa.infoLocal){
        infoGlobalMapa.infoLocal = new google.maps.InfoWindow({map: infoGlobalMapa.map});
        infoGlobalMapa.infoLocal.setContent('Usted se encuentra aqui.');
      }

              infoGlobalMapa.infoLocal.close();
              infoGlobalMapa.infoLocal.open(infoGlobalMapa.map, infoGlobalMapa.ubicacionActual);

            });

  }, function(){

      error();

  });

  } else {

    // El navegador no soporta la geolocalizacion
    //handleLocationError(false, infoWindow, infoGlobalMapa.map.getCenter());

      infoGlobalMapa.ubicacionActual = new google.maps.Marker({

        position: {lat: 36.540, lng: -4.620},
        map: infoGlobalMapa.map,
        title: 'Usted esta aqui!',
        icon:'img/ubicacion.png'

      });

      infoGlobalMapa.ubicacionActual.addListener('click', function() {

        if (!infoGlobalMapa.infoLocal){
          infoGlobalMapa.infoLocal = new google.maps.InfoWindow({map: infoGlobalMapa.map});
          infoGlobalMapa.infoLocal.setContent('Usted se encuentra aqui.');
        }

        infoGlobalMapa.infoLocal.close();
        infoGlobalMapa.infoLocal.open(infoGlobalMapa.map, infoGlobalMapa.ubicacionActual);

      });

    }

  return false;
}

function error(){
  alert('No tiene acceso a su ubicacion');
}

function geocodeAddress(geocoder,datos) {

  var address = document.getElementById('direccion').value;

  geocoder.geocode({'address': address}, function(results, status) {

    if (status === google.maps.GeocoderStatus.OK) {

      infoGlobalMapa.map.setCenter(results[0].geometry.location);
      var cadena = ''+results[0].geometry.location;
      var lat =  parseFloat(cadena.substr(1,9));
      var lng = parseFloat(cadena.substr(12,9));

      var marker = new google.maps.Marker({

        map: infoGlobalMapa.map,
        position: results[0].geometry.location,
        icon: datos.icon
      });

      localizaciones.push(
      {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        tipo:datos.tipo,
        icon:datos.icon,
      	lat: lat,
      	lng: lng,
        foto:datos.foto

      });


    (function(marker){
      google.maps.event.addListener(marker,'click',function()
      {
      if(!infoGlobalMapa.infoLocal){
        infoGlobalMapa.infoLocal = new google.maps.InfoWindow();
      }

        var output = "";
        output +="<p class='mini'>Nombre:</p><p class='mini'><b>"+datos.nombre+"</b></p>";
        output +="<p class='mini'>Descripcion:</p><p class='mini'><b>"+datos.descripcion+"</b></p>";
        output +="<p class='mini'>Foto establecimiento</p><img class='imagenes'' src='"+datos.foto+"'>'</p>";

        muestraTapas(datos.nombre);

        infoGlobalMapa.infoLocal.setContent(output);
        infoGlobalMapa.infoLocal.open(infoGlobalMapa.map,marker);
        infoGlobalMapa.infos.push(infoGlobalMapa.infoLocal);
      });
    })(marker);

    infoGlobalMapa.markers.push(marker);

    alert(datos.nombre+' fue insertado correctamente');

    drop();

    } else {

      alert('Geocoder tuvo problemas, el fallo pudo deberse a: ' + status);
    }
  });
}

function muestraTapas(nombre){

  var tapas = [];
  var output = "";
  var div = document.getElementById('tapas');
  div.innerHTML = output;

  output += '<div class="row>';
  output += '<div class="col-xs-12 tapa">';
  output += '<h2>Establecimiento de Nombre:'+nombre+'</h2>';

  tapas = devolverTapa(nombre);
  if (tapas) {

    for (var i = 0; i < tapas.length; i++) {
      tapa = tapas[i]

      output += '<div id='+ tapa.nombre_tapa+' class="col-xs-12">';
      output +="<p class='mini'>Nombre Tapa:</p><p class='mini'><b>"+tapa.nombre_tapa+"</b></p>";
      output +="<p class='mini'>Descripcion:</p><p class='mini'><b>"+tapa.descripcion_tapa+"</b></p>";
      output +="<p class='mini'>Foto establecimiento</p><img class='imagenes'' src='"+tapa.foto+"'>'</p>";
      output += '<p class="mini">Valoración: '+tapa.valoracion+' </p></div>';

    }

    output += '</div></div>'
  };
  div.innerHTML = output;
}

function comprobarMarkers(){
  var vacios = false;
  if (infoGlobalMapa.markers.length == 0) {
    vacios = true;
  }
  return vacios;
}

function geocodeLatLng(input) {

  var geocoder = new google.maps.Geocoder();
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        alert(results[1].formatted_address);
        return results[1].formatted_address;

      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}


/* Las dos unicas funciones que no me funcionan*/
function calcularRuta()
{
  map = infoGlobalMapa.map;
	//selecciona modo de viaje
	var selectedMode = document.getElementById("mode").value;
  selectedMode = 'WALKING';

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

  var miorigen = geocodeLatLng(document.getElementById('comienzo').value);
  var midestino = geocodeLatLng(document.getElementById('final').value);

	var request =
		{
			origin: miorigen,
		  destination: midestino,

      travelMode: google.maps.TravelMode[selectedMode]
		}

		directionsService.route(request,function(response,status){

		 	if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
			}
		 });

		 directionsDisplay.setMap(map);
}
