 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyAMlY8XSEiIhadWUSuLr5lgk7InHzoGbU8",
    authDomain: "tesisionchezcarlos.firebaseapp.com",
    databaseURL: "https://tesisionchezcarlos.firebaseio.com",
    projectId: "tesisionchezcarlos",
    storageBucket: "tesisionchezcarlos.appspot.com",
    messagingSenderId: "870351785078"
  };
  firebase.initializeApp(config);

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(()=>{
    console.log("se establecio la persistencia")
  })
