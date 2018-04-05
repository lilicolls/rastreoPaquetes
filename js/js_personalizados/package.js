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

function findPackages () {
    database.ref('/paquetes/').on('child_added', (data)=>{
        console.log(data.val())
    })
    
}