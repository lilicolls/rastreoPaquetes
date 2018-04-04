const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnInicioSesion = document.getElementById('btnInicioSesion');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const seccionUno = document.getElementById('seccionUno');
const seccionDos = document.getElementById('seccionDos');
const seccionTres = document.getElementById('seccionTres');


firebase.auth().onAuthStateChanged( firebaseUser => {
    if (firebaseUser) {
      //console.log(firebaseUser);
      seccionUno.style.display = "none";//Desaparecemos seccionUno.
      seccionDos.style.display = "inline";//Aparecemos seccionUno.
      seccionTres.style.display = "inline";//Aparecemos seccionDos.
    }
    else {
      //console.log('No Logeado');
      seccionUno.style.display = "inline";//Aparecemos seccionUno.
      seccionDos.style.display = "none";//Desaparecemos seccionUno.
      seccionTres.style.display = "none";//Desaparecemos seccionDos.
    }
  });
btnInicioSesion.addEventListener('click', ()=>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    firebase.auth().signInWithEmailAndPassword(email, pass)     
    .then(()=>{
        console.log("working")
        swal({
            title: "¡Bienvenido!",
            icon: "success",
          });
    }) 
    .catch((err)=>{
        console.log(err)
    }) 
})

btnCerrarSesion.addEventListener('click', e => {
    firebase.auth().signOut();
  });

