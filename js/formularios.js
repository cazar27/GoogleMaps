
function initManejadores(){
  'use strict'
  // estos son los botones de onsubmit de los formularios asignados a sus funciones
  var formEst = document.getElementById('establecimiento');
  formEst.onsubmit = addEstablecimiento;
  //var formTap = document.getElementById('formTapa');
  //formTap.onsubmit = addTapa;
  var formTap = document.getElementById('addTapa');
  formTap.onclick = addTapa;

  // estos son los botones asignados a sus funciones por onclick
  var limpiar = document.getElementById('limpiar');
  limpiar.onclick = clearMarkers;
  var ruta = document.getElementById('ruta');
  /*
  ruta.onclick = function(){
    calculateAndDisplayRoute();
  }();
 */
  var botonEsta = document.getElementById('establecimientos');
  var botonEsta2 = document.getElementById('establecimientos2');

  botonEsta.onclick = mostrarEstablecimientos;
  botonEsta2.onclick = mostrarEstablecimientosType;

  var mensaje = document.getElementById('ui-id-4');
//  var mensaje2 = document.getElementById('ui-id-5');
  var mensaje3 = document.getElementById('ui-id-3');
  mensaje.onclick = mensajeAp;
//  mensaje2.onclick = mensajeAp;
  mensaje3.onclick = mensajeAp;
}

function addEstablecimiento(){

  var nombre,descripcion,tipo;
  nombre = document.getElementById('nombre').value;
  descripcion = document.getElementById('descripcion_tapa').value;
  tipo = document.getElementById('tipo').value;

  var datos = {
  	nombre: nombre,
  	descripcion: descripcion,
    tipo:tipo,
    icon:'img/'+tipo+'.png',
  	foto:'img/bar/sin_foto.jpg'
  }

  var geocoder = new google.maps.Geocoder();

  geocodeAddress(geocoder,datos);
  rellenarSelect();
  //rellenarCheck();
  return false;
}

function mostrarEstablecimientos(){
  drop();
}
function mostrarEstablecimientosType(){
  dropType(document.getElementById('cat').value);
}

function mostrarRuta(){
  /*
  calculateAndDisplayRoute2();
  */
  alert('mostrarRuta');
  return false;
}


function mensajeAp(){

  //mensaje para avisar si hay o no restaurantes();

  if (comprobarMarkers()) {
    alert('No se añadiron aun establecimientos, debe añadirlos primero para esta funcionalidad');
  }
  return false;
}

function addTapa(){

  var nombre,nombre_tapa,descripcion_tapa;
  nombre = document.getElementById('nombre_bares').value;
  nombre_tapa = document.getElementById('nombre_tapa').value;
  descripcion_tapa = document.getElementById('descripcion_tapa').value;

  var tapa = {
  	nombre_tapa: nombre_tapa,
  	descripcion_tapa:descripcion_tapa,
  	foto:'img/tapas/sin_foto.jpg',
    valoracion:0
  };

  addTapaBar(nombre,tapa);
  return false;

}
