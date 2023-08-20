var grdDatos = document.getElementById('grdDatos');
var idUpdate = "";

window.addEventListener("load", function (event) {
    GetUsers();
    GetAreas();

    let label = document.getElementById("lblUser");
    label.innerText = localStorage.getItem("usuario");
});

function GetUsers() {
    grdDatos.innerHTML = "";
    fetch("https://localhost:7126/api/users")
      .then(x => x.json())
      .then(y => {
        y.forEach(element => {
          grdDatos.insertRow().innerHTML = `
              <td>${element.Usuario}</td>
              <td>${element.Rol}</td>
              <td>${element.Estado}</td>
              <td>${element.Area}</td>
              <td style='text-align: end;'> 
              <button id="buttonSave" class='btn btn-primary' onclick="CargarDatos(${element.Id},'${element.Usuario}','${element.Clave}','${element.Rol}','${element.Estado}','${element.Area}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class='fa fa-edit'></i></button>
              <button class='btn btn-danger' onclick="DeleteUsers(${element.Id});"> <i class='fa fa-trash'></i></button>
              </td>
              `;
        });
      });
  }

  function GetAreas() {
    fetch("https://localhost:7126/api/users/areas")
        .then(x => x.json())
        .then(y => {
            y.forEach(element => {
                let listaAreas = document.getElementById("lstAreas");
                listaAreas.innerHTML += "<option value='" + element.Nombre + "'>" + element.Nombre + "</option>";
            });
        });
}

function CargarDatos(id, usuario, rol, estado, clave) {
    idUpdate = id;
    document.getElementById("Usuario").value = usuario;
    document.getElementById("Rol").value = rol;
    document.getElementById("Estado").value = estado;
    document.getElementById("Clave").value = clave;
    //document.getElementById("Area").value = area;
  
    var button = document.getElementById("btnActualizar");
    if (button.style.display == "none") {
      button.style.display = "block";
    }
  
    var buttonGuardar = document.getElementById("btnGuardar");
    buttonGuardar.style.display = "none";
  }

  function showButtonSave() {
    var button = document.getElementById("btnActualizar");
    button.style.display = "none";
    var buttonGuardar = document.getElementById("btnGuardar");
    buttonGuardar.style.display = "block";
    GetUsers();
  }

function PutUsers(id) {
    const objetoPost = {
      idUpdate: id,
      usuario: document.getElementById("Usuario").value,
      clave: document.getElementById("Clave").value,
      rol: document.getElementById("Rol").value,
      estado: document.getElementById("Estado").value
    };
  
    fetch("https://localhost:7126/api/users?id=" + id, {
        method: "PUT",
        body: JSON.stringify(objetoPost),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(x => x.json())
      .then(y => {
        console.log("Actualización de usuarios realizada correctamente");
        GetUsers();
      });
  }

  function DeleteUsers(id) {
    fetch("https://localhost:7126/api/users?id=" + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(x => x.json())
      .then(y => {
        console.log("Baja de usuario realizada correctamente");
        GetUsers();
      });
  }

  function PostUsers() {
    var usuario = document.getElementById("Usuario").value;
    var clave = document.getElementById("Clave").value;
    var rol = document.getElementById("Rol").value;
    var estado = document.getElementById("Estado").value;
  
    // Crear un objeto con los datos del área
    var user = {
      usuario: usuario,
      clave: clave,
      rol: rol,
      estado: estado
    };
  
    // Realizar la petición POST para enviar el área al servidor
    fetch("https://localhost:7126/api/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => {
        // Aquí puedes realizar acciones adicionales después de enviar el área, como actualizar la tabla de áreas o mostrar un mensaje de éxito
        console.log("Alta de usuario correcta");
        GetUsers();
      })
      .catch(error => {
        // Aquí puedes manejar errores en caso de que ocurra algún problema durante el envío del área
        console.error(error);
      });
  }