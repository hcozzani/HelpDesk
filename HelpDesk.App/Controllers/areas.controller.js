var grdDatos = document.getElementById('grdDatos');
var idUpdate = "";

window.addEventListener("load", function(event) {
  getAreas();
  let label = document.getElementById("lblUser");
  label.innerText = localStorage.getItem("usuario");
});


async function getAreas() {

  grdDatos.innerHTML = "";
  await  fetch("https://localhost:7126/api/areas")
  .then(x => x.json())
  .then(y => {
      y.forEach(element => {

          let rol = localStorage.getItem("rol");
          var button = document.getElementById("buttonSave");

          if(rol == "0"){
              button.style.display = "block"
              grdDatos.insertRow().innerHTML = `
              <td>${element.Nombre}</td>
              <td>${element.Descripcion}</td>
              <td>${element.Jefe}</td>
              <td>${element.Estado}</td>
              <td style='text-align: end;'> 
                  <button  id="buttonSave" class='btn btn-primary' onclick="CargarDatos(${element.Id},'${element.Nombre}','${element.Descripcion}','${element.Jefe}','${element.Estado}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class='fa fa-edit'></i></button>
                  <button  id="buttonSave" class='btn btn-danger'  onclick="DeleteArea(${element.Id});"> <i class='fa fa-trash'></i></button>
              </td>`;
          }else{
              button.style.display = "none"
              grdDatos.insertRow().innerHTML = `
              <td>${element.Nombre}</td>
              <td>${element.Descripcion}</td>
              <td>${element.Jefe}</td>
              <td>${element.Estado}</td>
              <td style='text-align: end;'></td>
              `;
          }
      });

  });
}


function CargarDatos(id, nombre, descripcion, jefe, estado) {
  idUpdate = id;
  document.getElementById("Nombre").value = nombre;
  document.getElementById("Descripcion").value = descripcion;
  document.getElementById("Jefe").value = jefe;
  document.getElementById("Estado").value = estado;

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
  getAreas();
}

function PutArea(id) {
  const objetoPost = {
    id: idUpdate,
    nombre: document.getElementById("Nombre").value,
    descripcion: document.getElementById("Descripcion").value,
    jefe: document.getElementById("Jefe").value,
    estado: document.getElementById("Estado").value
  };

  fetch("https://localhost:7126/api/areas?id=" + id, {
      method: "PUT",
      body: JSON.stringify(objetoPost),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(x => x.json())
    .then(y => {
      getAreas();
      console.log("Actualización de área realizada correctamente");
    });
}

function DeleteArea(id){
  fetch("https://localhost:7126/api/areas?id=" + id, {
      method: "DELETE",
      headers: {
          "Content-type": "application/json"
      }
  })
  .then(x => x.json())
  .then(y => {
       console.log("Baja de área realzada correctamente");
       getAreas();
   });
}

function PostArea() {
  var nombre = document.getElementById("Nombre").value;
  var descripcion = document.getElementById("Descripcion").value;
  var jefe = document.getElementById("Jefe").value;
  var estado = document.getElementById("Estado").value;

  // Crear un objeto con los datos del área
  var area = {
    nombre: nombre,
    descripcion: descripcion,
    jefe: jefe,
    estado: estado
  };

  // Realizar la petición POST para enviar el área al servidor
  fetch("https://localhost:7126/api/areas", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(area)
    })
    .then(response => response.json())
    .then(data => {
      // Aquí puedes realizar acciones adicionales después de enviar el área, como actualizar la tabla de áreas o mostrar un mensaje de éxito
      getAreas();
    })
    .catch(error => {
      // Aquí puedes manejar errores en caso de que ocurra algún problema durante el envío del área
      console.error(error);
    });
}
