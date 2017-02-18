
// objeto literal con variables del mapa
var infoGlobalMapa = {
	// variables
	markers : [],          // array de markers
	infos : [] ,          // array de infowindows
	infoLocal :null,
	ubicacionActual: null ,
	direccionUbicacion: null,
	map: null              // elemento del DOM referencia al mapa
};

(function(){

	window.onload = function(){
		// llamar a la api de google hace que llame al init map porq lo q el mapa se abre dos veces
		initMap();
		initManejadores();
	};

})();
