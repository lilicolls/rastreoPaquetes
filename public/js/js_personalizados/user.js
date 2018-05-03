
'use strict'

const database = firebase.database();
const btnBuscarPorUsuario = document.getElementById('btnBuscarPorUsuario')


function findUserPackage(cedula){
    //metodo para buscar los paquetes de el usuario -> filtrando por la cedula del mismo
    console.log(`la cedula del usuario es ${cedula}`)
   database.ref('/usuarios/' + cedula).child('paquetes').once('value')
   .then((snapshot)=>{
       //el resultado de la busqueda se obtine en el objeto snapshot!!
       if(!snapshot.val()){
        console.log("no tiene paquetes")
        swal({
            
            title: "¡No se ha encontrado!",
            text: "Actualmente no tenemos un paquete registrado a su nombre. Por favor intente más tarde o póngase en contacto con el remitente"

        })
       }else {
        //    console.log(snapshot.val())
        //    console.log(typeof(snapshot.val()))
        //    console.log("si tiene paquetes")
           
        //    var userPackageId = snapshot.val().nombre

        //      let prueba = (Object.values(snapshot.val()))
           //  console.log(prueba[0].apellipo)
            //  console.log(typeof(userPackageId))
             swal({
                icon: "info",
                title: "¡Conoce la informacion en tiempo real!",
                text: "Haz click en la tabla sobre el paquete que desees rastrear."
            })

            let data = snapshot.val()
            Object.keys(data).forEach((key)=>{
                let idUserPackage = key
                findInfoPackage(key)
                console.log( key)
                
              })
       }
   })
   .catch((err)=>{
        console.log(err)
   })
}

function findInfoPackage (id) {
    //metodo para obtener y llenar en la tabla la informacion de cada paquete del usuario
    database.ref('/paquetes/'+ id).on('value', (data)=>{
        console.log(data.val())
    })
    
function validateId() {
    //en el metodo se valida si se conoce la cedula del usuario para hacer la busqueda de sus paquetes en la base de datos
    //si no se posee la cedula se le solicita y posteriormente se realiza la busqueda con la cedula obtenida
    if (cedula == "" || cedula == null){
        console.log(`le pido la cedula al user porque ahora es ${cedula}`)
        let inputText = document.createElement("input")
        
        swal({
            title: "Por favor, introduce tu cédula",
            text: "Ejemplo: v-24xxxxxx",
            icon: "info",
            content: {
                element: inputText,
                attributes: {
                    placeholder: "v-xxxxxxxx",
                    
                  },
            }
        })
        .then(()=>{
            
            cedula = inputText.value
            console.log(cedula)
            findUserPackage(cedula)
        })
    }else {
        // console.log("hago la busqueda normal")
        findUserPackage(cedula)
    }
}