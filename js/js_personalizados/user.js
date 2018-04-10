
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
       }else {
           
           console.log("si tiene paquetes")
        //    console.log(snapshot.val())
             fillTable(snapshot.val())
       }
   })
   .catch((err)=>{
        console.log(err)
   })
}

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
        console.log("hago la busqueda normal")
        findUserPackage(cedula)
    }
}

