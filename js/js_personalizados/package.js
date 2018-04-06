'use strict'


function findPackage(idPackage = "62 27 F2 8B") {
    //metodo para filtrar un paquete por su id!

    database.ref('/paquetes/' + idPackage).once('value')
    .then((snapshot)=>{
        if(!snapshot.val()){
            console.log("el paquete no existe")
        }else{
            //si el paquete existe obtengo los datos que quiera 
            // y busco la ubicacion del camion en el que esta
            const unidadTransp = snapshot.val().unidad
            console.log(unidadTransp) 
            database.ref('/unidad/' + unidadTransp).once('value')
            .then((snapshot)=>{
                if(!snapshot.val()){
                    console.log("el camion no existe:(")
                }else {
                    console.log( snapshot.val())
                    // llamo a la funcion que imprima los datos en texto mas el mapa
                }
            })
        }
    })
    .catch((err)=>{
        console.log(`Ocurrió un error en la consulta ${err}`) 
    })

}

function findPackages (ciudad) {
    //metodo para filtrar la busqueda de paquetess
    // si el usuario proporciona una ciudad, el metodo retorna los paquetes de dicha ciudad
    //si el usuario no proporciuna ciudad entonces el metodo retorna todos los paquetes almacenados en la base de datos
    let ref = ""
    if (ciudad) {
        console.log(`busco por ciudad en ${ciudad}`)
        ref = database.ref('/paquetes/').orderByChild("destino").equalTo(ciudad)
    }else {
        console.log("busco todos los paquetes")
        ref = database.ref('/paquetes/')
    }
    ref.on( 'value', (snapshot,err)=>{
       if(!snapshot.val()){
        console.log("no tiene paquetes")
        
       }else {
        console.log("tiene paquetes")
        console.log(snapshot.val())
        fillTable(snapshot.val())               //llamo a la funcion para mostrar los datos en la tabla
       }
        
    })
    
   
}