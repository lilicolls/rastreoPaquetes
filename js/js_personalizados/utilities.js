 $(document).ready(initiateTable)
var map = null; 
var marker = null;
const iconBase = 'imagenes/truck.png';

function initiateTable() {
   $('#tabla').tabulator({
    layout:"fitColumns", //fit columns to width of table (optional)
    tooltips:true, // set tooltips to true or false   
    pagination:"local", //'local' or 'remote'. local loads all the data and then paginate while remote loads upon ajax call
    paginationSize:7, // number of rows before applying pagination
    movableColumns:true, // allows columns to be moved around
    resizableRows:true, // allows rows to be resize'
    // initialSort:[
    //   {column:"ID Paquete", dir:"asc"},
    // ],    
      columns:[ //Define Table Columns
          {title:"ID Paquete", field:"id_paquete", width:150, onClick: "prueba()"},
          {title:"Cédula Usuario", field:"cedula"},
          {title:"Nombre Usuario", field:"nombre", align:"left"},
          {title:"Descripcion", field:"descripcion"},
          
      ],  rowClick:function(e, row){ //trigger an alert message when the row is clicked
        seccionCinco.style.display = "inline";//Aparecemos modal.
        console.log(row.getData().id_paquete);
        findPackage(row.getData().id_paquete) //en caso de que el usuario haga click en una fila llamo a la funcion que busca en la base de datos
        //la info del id pulsado
    },     
   })
}

function fillTable (obj){
    //El metodo se encarga de convertir el objeto recibido en un arreglo
    //y de llamar al metodo encargado de llenar la tabla.
    let arr = []
      Object.keys(obj).forEach((key)=>{
          console.log( key)
          arr.push(obj[key])
      })
      $("#tabla").tabulator("setData", arr);   
  }



function initMap() {
   console.log("hola")
    var uluru = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: uluru
    });
    marker = new google.maps.Marker({
      position: uluru,
      map: map,
       icon: iconBase 
    });
//    console.log(map, marker)
}

function updateInfPackage(obj){
    // console.log(obj)
    const idPaquete = document.getElementById('idPaquete')
    const nombre = document.getElementById('nombre')
    const apellido = document.getElementById('apellido')
    const salida = document.getElementById('salida')
    const destino = document.getElementById('destino')
    const unidad = document.getElementById('unidad')
    const desc = document.getElementById('desc')

    unidad.textContent = (`Unidad: ${obj.unidad}`)
    nombre.textContent = (`Nombre: ${obj.nombre}`)
    destino.textContent = (`Destino: ${obj.destino}`)
    idPaquete.textContent = (`Id paquete: ${obj.id}`)
    salida.textContent = (`Salida: ${obj.salida}`)
    desc.textContent = (`Descripcion: ${obj.descripcion}`)
    apellido.textContent = (`Apellido: ${obj.apellido}`)
    console.log(obj.apellido)
    

}

function updateMapLocation(obj) {
    console.log( obj.latitud)
    console.log(obj.longitud)
    
    let latitude = parseInt( obj.latitud,10)
    let longtitude = parseInt(obj.longitud,10)
    myLatlng = new google.maps.LatLng(latitude, longtitude);
     map.setCenter(myLatlng);
     marker.setPosition(myLatlng);

}

function closeModal() {
    //cerrar modal y detener agentes de escucha
    // falta agregar lo ultimo
    seccionCinco.style.display = "none";//Aparecemos seccionUno.
}

// window.onclick = function(event) {
    
//     var hijos = document.getElementById("seccionCinco").childNodes
//     console.log(hijos)
//     if (event.target != hijos) {
        
//     }
//     console.log(event.target)
// }

var body = document.getElementById('total-body');
body.addEventListener('click', function(){
    console.log("click en el body")
})
function selectCity() {
    let cities = ["Barquisimeto", "Maracaibo", "Valencia", "Anzoategui", "Mérida", "Carabobo"];
    let select = document.createElement("select")
    const length = cities.length
    for (let i = 0; i< length; i++){
        var option = document.createElement("option")
        option.value = cities[i]
        option.text = cities[i]
        select.appendChild(option)
    }
    console.log(option)
    swal({
        content: select,
        title: "Por favor selecciona uno",
        text: "Elige la ciudad de destino del paquete a buscar",
        icon: "info",
    }).then(()=>{
        city = select.options[select.selectedIndex].text;
        findPackages(city)
    })
    
}