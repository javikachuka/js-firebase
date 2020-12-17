
function registrar (){
    //console.log('Diste un clic')
    var email = document.getElementById('email').value;
    var clave = document.getElementById('password').value;
    console.log(email);
    console.log(clave);
    firebase.auth().createUserWithEmailAndPassword(email, clave)
    .then(function(){
      //SOLO SE EJECUTA VERIFICAR PARA EL USUARIO QUE SE ESTA REGISTRANDO
        console.log('Usuario creado')
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        //alert(errorMessage);
        
        // ...
      });email-clave.html
}

function ingresar (){

  var email = document.getElementById('email').value;
  var clave = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, clave)
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
  });
  
  
}
function observador (){


    firebase.auth().onAuthStateChanged(
      function(user) {
      if (user) {
        // User is signed in.
        contenido = document.getElementById('contenido');
        console.log('Existe usuario activo');
        aparece(user);
        var displayName = user.displayName;
        var email = user.email;
        console.log("ESTO ES PARA MOSTRAR LA VERIFICACION VIA MAIL");
        console.log(user.emailVerified);
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        contenido.innerHTML = `   
        <div class = "container mt-5">   
        <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Hola estas logueado!</h4>
        <button type="button" class="btn btn-primary btn-sm" onclick="salir()">Salir</button>
        </div>
        </div>
        `;
        // ...
      } else {
        // User is signed out.
        console.log("usuario NO Logueda");
        contenido.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h4>
                    Ingresar
                </h4>
            </div>
            <div class="card-body">
                <form action="">
                    <label for="">Email</label>
                    <input type="email" required name="email" id="email" class="form-control"
                        placeholder="Ingrese su email por favor">

                    <label for="">Contraseña</label>
                    <input type="password" name="password" id="password" class="form-control"
                        placeholder="Ingrese su password por favor">
                    <br>
                    <div class="d-flex justify-content-start">
                        <button type="button" class="btn btn-primary btn-sm" onclick="registrar()">Registrate</button>
                        <button type="button" class="btn btn-success btn-sm ml-2" onclick="ingresar()">Acceder</button>
                    </div>
                </form>
            </div>
        </div>` ;
  
  
        // ...
      }
    });
    
  }
  
  function salir(){
      firebase.auth().signOut().then(()=>{
          console.log('saliste')
      }).catch((error)=>{
          console.log('error al salir')
          console.log(error)
      });
  }

  function aparece(user){
    var contenido = document.getElementById('contenido');
    if (user.emailVerified){
      contenido.innerHTML = `   
      <div class = "container mt-5">   
      <div class="alert alert-success" role="alert">
      <h4 class="alert-heading">Bienvenido! ${user.email}</h4>
      <p>"Contenido SOLO para usuarios ACTIVOS"</p>
      <hr>
      <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </div>
      <button onclick="cerrar()" class = "btn btn-danger">Cerrar Sesión</button>
      </div>
      `;
    }
  }

  observador();