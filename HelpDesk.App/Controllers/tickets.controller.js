let label="";
var grdDatos = document.getElementById('grdDatos');
var idUpdate = "";

window.addEventListener("load", function(event) {
    GetTickets();
    GetAreas();
    label = document.getElementById("lblUser");
    label.innerText = localStorage.getItem("usuario");
  });



  
  function GetTickets() {
    grdDatos.innerHTML = "";
    fetch("https://localhost:7126/api/tickets")
      .then(x => x.json())
      .then(y => {

      

        y.forEach(element => {
              grdDatos.insertRow().innerHTML = `
              <td>${element.Titulo}</td>
              <td>${element.Estado}</td>
              <td>${element.Asignado}</td>
              <td>${element.Autor}</td>
              <td>${element.FechaAltA}</td>
              <td>${element.FechaCierre}</td>
              <td style='text-align: end;'> 
              
              <button class='btn btn-primary' onclick="EnCurso(${element.Id});"> <i class="fa fa-thumb-tack" aria-hidden="true"></i> </button>
              <button class='btn btn-success' onclick="Terminado(${element.Id});"> <i class="fa fa-check" aria-hidden="true"></i> </button>
              <button class='btn btn-danger' onclick="Rechazado(${element.Id});"> <i class="fa fa-times" aria-hidden="true"></i> </button>
              
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

function PostTicket() {
    const fechaActual = new Date();
    const objetoPost = {
      id: 0,
      titulo: document.getElementById("Titulo").value,
      descripcion: document.getElementById("Descripcion").value,
      estado:'',
      autor: localStorage.getItem('usuario'),
      asignado:'',
      FechaAltA:'',
      FechaCierre:'',
      area: document.getElementById("lstAreas").value,
      visible:'',
    };
  
    fetch("https://localhost:7126/api/tickets", {
        method: "POST",
        body: JSON.stringify(objetoPost),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(x => x.json())
      .then(y => {
        console.log("Alta de tickets realizada correctamente");
        GetTickets();
      });
  }


  function showButtonSave() {
      var button = document.getElementById("btnActualizar");
      button.style.display = "none";
      var buttonGuardar = document.getElementById("btnGuardar");
      buttonGuardar.style.display = "block";
      GetTickets();
  }

  
  ///botones en curso, terminado y rechazado///

  function EnCurso(id) {
    const asignado = localStorage.getItem('usuario');
    

    fetch(`https://localhost:7126/api/tickets/curso?id=` +id +"&asignado="+ asignado)
      .then(response => response.json())
      .then(data => {
        console.log('Estado del ticket en curso');
        GetTickets();
      });
  }
  
  function Terminado(id) {
    const asignado = localStorage.getItem('usuario');
    const fechaCierre = new Date();
  
    const objetoPut = {
      id: id,
      estado: 'Terminado',
      asignado: asignado,
      FechaCierre: fechaCierre.toISOString()
    };
  
    fetch(`https://localhost:7126/api/tickets?id=`+id, {
      method: 'PUT',
      body: JSON.stringify(objetoPut),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Estado del ticket terminado');
        GetTickets();
      });
  }
  

  function Rechazado(id) {
    const asignado = localStorage.getItem('usuario');
    const fechaCierre = new Date();
  
    const objetoPut = {
      id: id,
      estado: 'Rechazado',
      asignado: asignado,
      FechaCierre: fechaCierre.toISOString()
    };
  
    fetch(`https://localhost:7126/api/tickets?id=`+id, {
      method: 'PUT',
      body: JSON.stringify(objetoPut),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Estado del ticket rechazado');
        GetTickets();
      });
  }
  
