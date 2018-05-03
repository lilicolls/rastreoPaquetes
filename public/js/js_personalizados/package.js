'use strict'


function findPackage(idPackage = "62 27 F2 8B") {
    //metodo para filtrar un paquete por su id!

    database.ref('/paquetes/' + idPackage).once('value')
    .then((snapshot)=>{
        if(!snapshot.val()){
            console.log("el paquete no existe")
            swal({
                icon: "warning",
                title: "¡No se ha encontrado!",
                text: `No existe un paquete registrado con el id ${idPackage}. Por favor verifique el número o intente más tarde .`
            })
        }else{
            //si el paquete existe obtengo los datos que quiera 
            // y busco la ubicacion del camion en el que esta
             console.log(snapshot.val())
            const paquete = {
                id: snapshot.val().id_paquete,
                nombre: snapshot.val().nombre,
                apellido : snapshot.val().apellido,
                salida : snapshot.val().salida,
                destino : snapshot.val().destino,
                unidad : snapshot.val().unidad,
                descripcion : snapshot.val().descripcion,
                status: snapshot.val().status,
            }

            console.log(paquete)
            const unidadTransp = snapshot.val().unidad
            updateInfPackage (paquete)
             if (paquete.status) {
                //el paquete esta disponible, muestro en el mapa la ubicacion de la tienda para que lo retire
                console.log("paquete disponible muestro ubicacion de la store")
                findStore(paquete.destino)
             } else {
                // el paquete aun no esta disponible, muestro la ubicacion del camion en tiempo real
                console.log("paquete disponible muestro ubicacion del camion")
                findTruck(unidadTransp)
             }
            
            // database.ref('/unidad/' + unidadTransp).on('value', (data)=>{
            //     console.log(data.val())

            //     if(!data.val()){
            //         console.log("el camion no existe :(")
                    
            //     }else {
            //         console.log( data.val())
            //         updateMapLocation(data.val())
            //         // llamo a la funcion que imprima los datos en texto mas el mapa
                     seccionCinco.style.display = "inline";//Aparecemos modal.
            //     }
            
            // })
        }
    })
    .catch((err)=>{
        console.log(`Ocurrió un error en la consulta ${err}`) 
    })

}

function findStore(destino) {
    console.log(`voy a buscar en ${destino}`)
    database.ref('/destinos/' + destino).once('value')
    .then((snapshot)=>{
        console.log("la ubicacion de la tienda es:")
        console.log(snapshot.val())
        updateMapLocation(snapshot.val(), "store")
    })
    .catch((err)=>{
        console.log(err)
    })

}

function findTruck (idTruck) {
     database.ref('/unidad/' + idTruck).on('value', (data)=>{
              //  console.log(data.val())

                if(!data.val()){
                    console.log("el camion no existe :(")
                    
                }else {
                  //  console.log( data.val())
                    updateMapLocation(data.val(), "truck")
                    // llamo a la funcion que imprima los datos en texto mas el mapa
                    seccionCinco.style.display = "inline";//Aparecemos modal.
                }
            
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
        swal({
            icon: "warning",
            title: "¡No se ha encontrado!",
            text: `No hay paquetes registrados con el destino ${ciudad}. Por favor intente más tarde .`
        })
        
       }else {
        console.log("tiene paquetes")
        console.log(snapshot.val())
        fillTable(snapshot.val())               //llamo a la funcion para mostrar los datos en la tabla
       }
        
    })
    
   
}

function getPackageId() {
    let inputText = document.createElement("input")
        
    swal({
        title: "Por favor, introduce el id del paquete a rastrear",
        text: "Ejemplo: 00 00 00 00",
        icon: "info",
        content: {
            element: inputText,
            attributes: {
                placeholder: "00 00 00 00",
              },
        }
    })
    .then(()=>{
        
        let id = inputText.value
        findPackage(id)
    })
}