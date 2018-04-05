$(document).ready(initiateTable)

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
          {title:"ID Paquete", field:"idPaquete", width:150},
          {title:"Cédula Usuario", field:"cedula"},
          {title:"Nombre Usuario", field:"nombre", align:"left", formatter:"progress"},
          {title:"Descripcion", field:"Des"},
          
      ],       
   })
}