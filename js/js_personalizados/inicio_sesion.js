const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');

const txtCedula = document.getElementById('txtCedula')
const btnInicioSesion = document.getElementById('btnInicioSesion');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const seccionUno = document.getElementById('seccionUno');
const seccionDos = document.getElementById('seccionDos');
const seccionTres = document.getElementById('seccionTres');
const seccionCuatro = document.getElementById('seccionCuatro');
const seccionCinco = document.getElementById('seccionCinco'); /// modal
const principalMenu = document.getElementById('principal-menu'); // barra menu superior
var cedula = ''

firebase.auth().onAuthStateChanged( firebaseUser => {
    if (firebaseUser) {
      //console.log(firebaseUser);
      seccionUno.style.display = "none";//Desaparecemos seccionUno.
      seccionDos.style.display = "inline";//Aparecemos seccionUno.
      seccionTres.style.display = "inline";//Aparecemos seccionDos.
      seccionCuatro.style.display = "inline";//Aparecemos seccionCuatro.
      principalMenu.style.display = "inline";//Aparecemos barra menu superior.
    
     // validateUser(cedula)
    
    }
    else {
      //console.log('No Logeado');
      seccionUno.style.display = "inline";//Aparecemos seccionUno.
      seccionDos.style.display = "none";//Desaparecemos seccionUno.
      seccionTres.style.display = "none";//Desaparecemos seccionDos.
      seccionCuatro.style.display = "none";//Desaparecemos seccionCuatro.
      principalMenu.style.display = "none";//Desaparecemos barra menu superior.
    }
  });
// btnInicioSesion.addEventListener('click', ()=>{
function login(){
    console.log("click")
    const email = txtEmail.value;
    const pass = txtPassword.value;
    cedula = txtCedula.value;
    firebase.auth().signInWithEmailAndPassword(email, pass)     
    .then(()=>{
        console.log("working")
        swal({
            title: "¡Bienvenido!",
            icon: "success",
          })
        .then(()=>{
          validateUser(cedula)
        }) 
    }) 
    .catch((err)=>{
        console.log(err)
    }) 

}    
// })

btnCerrarSesion.addEventListener('click', e => {
    firebase.auth().signOut();
  });


  function  validateUser(cedula){
    const btnBuscarPorUsuario = document.getElementById('btnBuscarPorUsuario');
    const btnBuscarPaquetes = document.getElementById('btnBuscarPaquetes');
    const btnBuscarPaquetesCiudad = document.getElementById('btnBuscarPaquetesCiudad');
    console.log("busco rol del usuario por su cedula")
    database.ref('/usuarios/' + cedula).child('cuenta').once('value')
    .then((snapshot)=>{
        console.log(snapshot.val())
        //agregar validacion de que el usuario exista en caso de que se pueda logear por el metodo auth
        //pero que no se tenga informacion por su cedula en la base de datos
        if(snapshot.val()== "Cliente"){
                ///El usuario tiene rol de cliente
                console.log("el usuario es cliente")
                btnBuscarPorUsuario.style.display = "inline";//
        }else if(snapshot.val()== "Supervisor") {
                ///El usuario es un supervisor
                console.log("el usuario es supervisor")
                btnBuscarPaquetes.style.display = "inline";//
                btnBuscarPaquetesCiudad.style.display = "inline";//
        }
    })
    .catch((err)=>{
        console.log(`ocurrio un error al buscar el rol del usuario ${err}`)
    })
}
