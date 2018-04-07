 $(document).ready(initiateTable)
var map = null; 
var marker = null;

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
      zoom: 4,
      center: uluru
    });
    marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
//    console.log(map, marker)
}

function updateInfPackage(obj){
    // console.log(obj)
    const idPaquete = document.getElementById('idPaquete')
    // const nombre = document.getElementById('nombre')
    // const apellido = document.getElementById('apellido')
    const salida = document.getElementById('salida')
    const destino = document.getElementById('destino')
    const unidad = document.getElementById('unidad')
    const desc = document.getElementById('desc')

    unidad.textContent = (`Unidad: ${obj.unidad}`)
    idPaquete.textContent = (`Id paquete: ${obj.id}`)
    salida.textContent = (`Salida: ${obj.salida}`)
    desc.textContent = (`Descripcion: ${obj.descripcion}`)
    

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

function prueba() {
    alert ("ghogo")
}