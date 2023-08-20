using HelpDesk.Api.Global;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Api.Controllers
{
    [Route("api/database")]
    [ApiController]
    public class DatabaseController : ControllerBase
    {
        [HttpGet("areas")]
        public void CrearAreas()
        {
            DbFunctionsSqlite.Exec(@"create table Areas (
            Id integer primary key autoincrement,
            Nombre varchar (50), 
            Descripcion varchar (100),
            Jefe varchar (20),
            Estado varchar (1));");
        }

        [HttpGet("tickets")]
        public void CrearTickets()
        {
            DbFunctionsSqlite.Exec(@"create table Tickets (
            Id integer primary key autoincrement,
            Titulo varchar (50), 
            Descripcion varchar (100),
            Estado varchar (10), 
            Autor varchar (50), 
            Asignado varchar (50), 
            FechaAltA varchar (50), 
            FechaCierre varchar (50),
            Area varchar (50),
            Visible varchar (1));");
        }
    }
}
