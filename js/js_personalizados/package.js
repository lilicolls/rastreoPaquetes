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
            const paquete = {
                id: snapshot.val().id_paquete,
                nombre: snapshot.val().nombre,
                apellido : snapshot.val().apellido,
                salida : snapshot.val().salida,
                destino : snapshot.val().destino,
                unidad : snapshot.val().unidad,
                descripcion : snapshot.val().descripcion,
            }
            console.log(paquete)
            const unidadTransp = snapshot.val().unidad
            updateInfPackage (paquete)
            
            database.ref('/unidad/' + unidadTransp).on('value', (data)=>{
                console.log(data.val())

                if(!data.val()){
                    console.log("el camion no existe :(")
                    
                }else {
                    console.log( data.val())
                    updateMapLocation(data.val())
                    // llamo a la funcion que imprima los datos en texto mas el mapa
                    seccionCinco.style.display = "inline";//Aparecemos modal.
                }
            
            })
            
            // database.ref('/unidad/' + unidadTransp).once('value')
            // .then((snapshot)=>{
            //     if(!snapshot.val()){
            //         console.log("el camion no existe:(")
            //     }else {
            //         // console.log( snapshot.val())
            //         updateMapLocation(snapshot.val())
            //         // llamo a la funcion que imprima los datos en texto mas el mapa
            //     }
            // })
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