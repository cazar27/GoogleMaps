
// funcion que inicia el mapa en Fuengirola debido a la lat y la lng con un zoom de 15
// creamos variables de inicio que son el map q usaremos en todo el codigo
// y los markers que seran los puntos del mapa
function initMap() {

  infoGlobalMapa.map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: {lat: 36.540, lng: -4.620}

  });
}

// funcion para rellenar el div de la opcion de las rutas con check
function rellenarCheck(){

  var output = "";
  var divCheck = document.getElementById('localizacionesCheck');
  divCheck.innerHTML = output;

  for (var i = 0; i < localizaciones.length; i++) {
      output += '<input type="checkbox" class="checkLoc" id="checkLoc'+i+'" name="puntos" value="'+ localizaciones[i].lat+','+localizaciones[i].lng+'">'+localizaciones[i].nombre+'<br>';
  }

  divCheck.innerHTML = output;
}

function rellenarSelect(){

  var selectCom  = document.getElementById('comienzo');
  var selectFin  = document.getElementById('final');
  var selectComR = document.getElementById('comienzoR');
  var selectFinR = document.getElementById('finalR');
  var addTap     = document.getElementById('addTapa');
  var output     = "";

  selectCom.innerHTML  = output;
  selectFin.innerHTML  = output;
  selectComR.innerHTML = output;
  selectFinR.innerHTML = output;
  addTap.innerHTML     = output;

  for (var i = 0; i < localizaciones.length; i++) {
      output += '<option class="selectLoc" id="selectLoc'+i+'" name="puntos" value="'+ localizaciones[i].lat+','+localizaciones[i].lng+'">'+localizaciones[i].nombre+'</option>';
  }

  selectCom.innerHTML  = output;
  selectFin.innerHTML  = output;
  selectComR.innerHTML = output;
  selectFinR.innerHTML = output;
  addTap.innerHTML = output;

}

// drop sera la funcion que sera llamada para mostrar los puntos del mapa
// lo primero que hacemos es crear los marcadores con la funcion addMarkerWithTimeout
// cojiendo los puntos del array de localizaciones

function drop() {

  clearMarkers();

  for (var i = 0; i < localizaciones.length; i++) {
    addMarkerWithTimeout(localizaciones[i], i * 200);
  }

  rellenarCheck();
  rellenarSelect();
}

function dropType(type) {

  clearMarkers();

  for (var i = 0; i < localizaciones.length; i++) {

    if (localizaciones[i].tipo==type) {

      addMarkerWithTimeout(localizaciones[i], i * 200);
    }
  }

  rellenarCheck();
  rellenarSelect();

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
  output +="<p>Nombre:</p><p><b>"+position.nombre+"</b></p>";
  output +="<p>Descripcion:</p><p><b>"+position.descripcion+"</b></p>";
  output +="<p>Foto tapa</p><img style='width:140px;height:70px;' src='"+position.foto+"'>'</p>";
  output +="<br><button class='tapas' id='"+position.nombre+"'>Ver tapas</button>";

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

    }, function(){

      handleLocationError(true, infoWindow, infoGlobalMapa.map.getCenter());

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

        if ( infoGlobalMapa.infoLocal == null){
          infoGlobalMapa.infoLocal = new google.maps.InfoWindow({map: infoGlobalMapa.map});
          infoGlobalMapa.infoLocal.setContent('Usted se encuentra aqui.');
        }

        infoGlobalMapa.infoLocal.close();
        infoGlobalMapa.infoLocal.open(infoGlobalMapa.map, infoGlobalMapa.ubicacionActual);

      });






  }

  return false;
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
        tapas:
        [
          {
            nombre_tapa:datos.nombre_tapa,
            descripcion_tapa:datos.descripcion_tapa
          }
        ],
        foto:datos.foto

      });


    (function(marker){
      google.maps.event.addListener(marker,'click',function()
      {
      if(!infoGlobalMapa.infoLocal){
        infoGlobalMapa.infoLocal = new google.maps.InfoWindow();
      }

        var output = "";
        output +="<p>Nombre:</p><p><b>"+position.nombre+"</b></p>";
        output +="<p>Descripcion:</p><p><b>"+position.descripcion+"</b></p>";
        output +="<p>Foto tapa</p><img style='width:140px;height:70px;' src='"+position.foto+"'>'</p>";
        output +="<br><button class='tapas' id='"+position.nombre+"'>Ver tapas</button>";

        infoGlobalMapa.infoLocal.setContent(output);
        infoGlobalMapa.infoLocal.open(infoGlobalMapa.map,marker);
        infoGlobalMapa.infos.push(infoGlobalMapa.infoLocal);
      });
    })(marker);

    infoGlobalMapa.markers.push(marker);

    alert(datos.nombre+' fue insertado correctamente');

    } else {

      alert('Geocoder tuvo problemas, el fallo pudo deberse a: ' + status);
    }
  });
}

function comprobarMarkers(){
  var vacios = false;
  if (infoGlobalMapa.markers.length == 0) {
    vacios = true;
  }
  return vacios;
}
