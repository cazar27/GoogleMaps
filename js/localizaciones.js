
var localizaciones = [
  {
    visitado: false,
  	nombre: 'Cerveceria Krusti',
  	descripcion: 'La mejor cerveza la encontrara en nuestro establecimiento',
    tipo:'bar',
    icon:'img/bar.png',
  	lat: 36.5413979,
  	lng: -4.6229077,
    tapas :[{
      valoracion:0,
      foto:'img/tapas/Pincho_piquillo_y_anchoas.jpg',
      nombre_tapa:'Pincho piquillo y anchoas',
  	  descripcion_tapa:'pimiento de piquillo anchoa y aceituna'
  	},{
      valoracion:0,
      foto:'img/tapas/Javi_tapa.jpg',
      nombre_tapa:'Javi Tapa',
      descripcion_tapa:'Carne de lomo'
    }],
    foto:'img/bar/Cerveceria_Krusti.jpg'
  },
  {
    visitado: false,
  	nombre: 'Restaurante Tragaldabas',
  	descripcion: 'El mejor restaurante de la costa del sol',
    tipo:'bar',
    icon:'img/bar.png',
  	lat: 36.5428073,
  	lng: -4.6210087,
    tapas :[{
      valoracion:0,
      foto:'img/tapas/Tapa_Jamon_huevo.jpg',
      nombre_tapa:'Tapa jamon huevo',
    	descripcion_tapa:'Jamon huevo acompañadas de aceitunas'
    }],
  	foto:'img/bar/Restaurante_Tragaldabas.jpg'
  },
  {
    visitado: false,
  	nombre: 'Cafeteria Micafetito',
  	descripcion: 'La cafeteria con el mejor cafe y entreantes del lugar',
    tipo:'cafeteria',
    icon:'img/cafeteria.png',
  	lat: 36.5447273,
  	lng: -4.6200107,
    tapas :[{
  	  valoracion:0,
      foto:'img/tapas/solomillo_al_foie.jpg',
      nombre_tapa:'solomillo al foie',
  	  descripcion_tapa:'Solomillo de ternera al foie, riquisimo con vino tinto'
    }],
  	foto:'img/bar/Cafeteria_Micafetito.jpg'
  },
  {
    visitado: false,
  	nombre: 'Papilas Felices',
  	descripcion: 'Un restaurante con cuatro tenedores, maximo placer gustativo',
    tipo:'restaurante',
    icon:'img/restaurante.png',
  	lat: 36.544788,
  	lng: -4.6258577,
    tapas :[{
  	  valoracion:0,
      foto:'img/tapas/arroz_con_camarones.jpg',
      nombre_tapa:'empanadilla delicia',
  	  descripcion_tapa:'empanadilla de queso con tomate cherry'
    }],
  	foto:'img/bar/Papilas_Felices.jpg'
  },
  {
    visitado: false,
    nombre: 'Alberto`s Bar',
    descripcion: 'Te esperamos con la mejor de nuestras sonrisas',
    tipo:'bar',
    icon:'img/bar.png',
    lat: 36.537868,
    lng: -4.6375311,
    tapas :[{
      valoracion:0,
      foto:'img/tapas/chorizo_portuano.jpg',
      nombre_tapa:'Chorizo Portuano',
      descripcion_tapa:'Delicioso'
    }
  ],
    foto:'img/bar/AlbertsBar.jpg'
  },
  {
      visitado: false,
    	nombre: 'Javi`s Restaurant',
    	descripcion: 'Te esperamos con la mejor de nuestras sonrisas',
      tipo:'gourmet',
      icon:'img/gourmet.png',
    	lat: 36.532322,
    	lng: -4.6378555,
      tapas :[{
    	  valoracion:0,
        foto:'img/tapas/chorizo_almendralejo.jpg',
        nombre_tapa:'Chorizo de almendralejo',
    	  descripcion_tapa:'Muy rico y sin pellejo'
      }],
    	foto:'img/bar/JavisRestaurant.jpg'
  },
  {
    visitado: false,
  	nombre: 'Vinoteca Tajaito',
  	descripcion: 'Los mejores vinos de Fuengirola',
    tipo:'restaurante',
    icon:'img/restaurante.png',
  	lat: 36.5342371,
  	lng: -4.6355995,
    tapas :[
    {
      valoracion:0,
      foto:'img/tapas/chorizo_de_cantinpalo.jpg',
      nombre_tapa:'Chorizo de cantimpalo',
      descripcion_tapa:'Se come con la boca o con la mano'
    }
    ],
  	foto:'img/bar/Vinoteca_Tajaito.jpg'
  }
];


function devolverTapa(nombre){

for (var i = 0; i < localizaciones.length; i++) {

  if (localizaciones[i].nombre == nombre) {
        return localizaciones[i].tapas;
    }
  }
}

function addTapaBar(nombre,tapa){

  var comprobar = false;

  for (var i = 0; i < localizaciones.length; i++) {

    if (localizaciones[i].nombre == nombre) {
      localizaciones[i].tapas.push(tapa);
      comprobar = true;
    }
  }
  if (!comprobar) {
    alert('No encontro el nuevo bar, muestre los marcadores de nuevo');
    return false;
  }

}
