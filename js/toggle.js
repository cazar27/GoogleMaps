// funcion para el toggle
$( function() {
    // funcion para el efecto
    function runEffect() {

      var options = {};

      options = { to: { height: '100%' } };

      $( "#desplegable" ).toggle( 'blind', options, 500 );

      if($('#map').width()=='100%') {
        $('#map').transition('width:66.5%',500)=='100%'
      }
    };

    $( "#menu" ).on( "click", function() {
      runEffect();
    });
  } );

// funcion para los tabs
  $( function() {
    $( "#tabs" ).tabs();
  } );
