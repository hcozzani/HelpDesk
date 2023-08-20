  window.addEventListener("load",function(event){
    localStorage.removeItem("rol");
    localStorage.removeItem("area");
    localStorage.removeItem("usuario");
    
  });

  function Login(){
    var _usuario = document.getElementById ("username").value;
    var _clave = document.getElementById ("password").value;

    const objetoPost ={
      usuario: _usuario,
      clave: _clave
    }

    fetch("https://localhost:7126/api/Login",{
      method:"POST",
      body: JSON.stringify(objetoPost),
      headers:{"Content-type":"application/json"}
   })
   .then(x => x.json())
   .then(y => {

    console.log(y);


      var rol = y[0].Rol;
      var estado = y[0].Estado;
      var area = y[0].Area;
  
      if(estado == "V"){
        localStorage.setItem("rol",rol);
        localStorage.setItem("area",area);
        localStorage.setItem("usuario",_usuario);
        location.href = "usuarios.html";
      }else if (estado == "B"){
        alert ("El usuario no esta vigente");
      }else{
        alert ("Usuario y/o contraseña incorrectos");
      }
   });
  }

