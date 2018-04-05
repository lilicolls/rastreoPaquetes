
'use strict'

const database = firebase.database();
const btnBuscarPorUsuario = document.getElementById('btnBuscarPorUsuario')


btnBuscarPorUsuario.addEventListener('click', ()=>{
    //metodo para buscar los paquetes de el usuario -> filtrando por la cedula del mismo
    console.log(`la cedula del usuario es ${cedula}`)
   database.ref('/usuarios/' + cedula).child('paquetes').once('value')
   .then((snapshot)=>{
       //el resultado de la busqueda se obtine en el objeto snapshot!!
       if(!snapshot.val()){
        console.log("no tiene paquetes")
       }else {
           
           console.log("si tiene paquetes")
           console.log(snapshot.val())
       }
   })
   .catch((err)=>{
        console.log(err)
   })
})