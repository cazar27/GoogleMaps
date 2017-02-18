var markers = [];
var infos = [];
var infoLocal;
var map;
// funcion que inicia el mapa en Fuengirola debido a la lat y la lng con un zoom de 15
// creamos variables de inicio que son el map q usaremos en todo el codigo
// y los markers que seran los puntos del mapa
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: {lat: 36.540, lng: -4.620}
});
}

// drop sera la funcion que sera llamada para mostrar los puntos del mapa
// lo primero que hacemos es crear los marcadores con la funcion addMarkerWithTimeout
// cojiendo los puntos del array de localizaciones
function drop() {
  clearMarkers();
  for (var i = 0; i < localizaciones.length; i++) {
    addMarkerWithTimeout(localizaciones[i], i * 200);
  }
}
// la funcion que crea los puntos usa las variables de cada objeto punto compartirUbicacion
// como posicion o el icono
function addMarkerWithTimeout(position, timeout) {
  window.setTimeout(function() {

    var marker;
    marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: position.icon,
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);
  (function(marker){
  google.maps.event.addListener(marker,'click',function()
  {
  if(!infoLocal){
    infoLocal = new google.maps.InfoWindow();
  }

  var output = "";
  output +="<p>Nombre: "+position.nombre+"</p>";
  output +="<p>Descripcion:</p><p>"+position.descripcion+"</p>";
  output +="<p>Nombre de la tapa: "+position.nombre_tapa+"</p>";
  output +="<p>Descripcion de la tapa:</p><p>"+position.descripcion_tapa+"</p>";
  output +="<p>Foto tapa</p><img src='"+position.nombre+"'>'</p>";

  infoLocal.setContent(output);
  infoLocal.open(map,marker);
  infos.push(infoLocal);
  });
  })(marker);

  }, timeout);
}
// esta funcion se usa para borrar los makers si se vuelve a pedir mostrarlos
function clearMarkers() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function compartirUbicacion(){

  // Creamos una ventana para mostrar donde nos ubicamos
  var infoWindow = new google.maps.InfoWindow({map: map});
  infoWindow.setContent('Usted se encuentra aqui.');
  //Creamos un punto para la ubicacion actual
  var ubicacionActual = new google.maps.Marker({
    position: {lat: 36.540, lng: -4.620},
    map: map,
    title: 'Usted esta aqui!',
    icon:'img/ubicacion.png'
  });

  ubicacionActual.addListener('click', function() {
  infoWindow.open(map, ubicacionActual);
  });
  ubicacionActual.setVisible(false);

  // Intentar la geolocalizacion de HTML5.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Cambiamos la posicion del punto para la ubicaion
    ubicacionActual.setPosition(pos);
    ubicacionActual.setVisible(true);

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // El navegador no soporta la geolocalizacion
    handleLocationError(false, infoWindow, map.getCenter());
  }

  return false;
}
