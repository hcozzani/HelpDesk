window.addEventListener("load", function(event){

    let label = this.document.getElementById("lblUser");
    label.innerText = this.localStorage.getItem("usuario");

    GetPendientes("En Curso");
    GetPendientes("Pendiente");
    GetPendientes("Rechazado");
    GetPendientes("Terminado");
});

function GetPendientes(estado){
   
    let alert = "";

    fetch("https://localhost:7126/api/dashboard?estado=" + estado)
    .then(x => x.json())
    .then(y => {


        switch(estado){

            case "Pendiente":
                alert = document.getElementById("pendientes");
                alert.innerText = "Tickets pendientes ("+ y[0].Total +")"
                break;

            case "En Curso":
                alert = document.getElementById("curso");
                alert.innerText = "Tickets en curso ("+ y[0].Total +")"
                break;

            case "Rechazado":
                alert = document.getElementById("rechazados");
                alert.innerText = "Tickets en rechazados ("+ y[0].Total +")"
                break;

                
            case "Terminado":
                alert = document.getElementById("terminados");
                alert.innerText = "Tickets en terminados ("+ y[0].Total +")"
                break;
        }
    });
}


function getDetalles(estado){
    grdDatos.innerHTML = "";
    fetch("https://localhost:7126/api/dashboard/detalles?estado=" + estado)
    .then(x => x.json())
    .then(y => {

        y.forEach(element => {
            grdDatos.insertRow().innerHTML = `
            <td>${element.Id}</td>
            <td>${element.Titulo}</td>
            <td>${element.Estado}</td>
            <td>${element.Autor}</td>
            <td>${element.Asignado}</td>
            <td>${element.FechaAltA}</td>
            <td>${element.FechaCierre}</td>`;
        });
    });
}


function exportTableToExcel(tblData, filename = 'dashboard-data'){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tblData);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
    
    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';
    
    // Create download link element
    downloadLink = document.createElement("a");
    
    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
}
