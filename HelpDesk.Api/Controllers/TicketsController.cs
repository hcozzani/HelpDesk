using HelpDesk.Api.Global;
using HelpDesk.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Api.Controllers
{
    [Route("api/tickets")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        [HttpGet]
        public string GetTickets()
        {
            return DbFunctionsSqlite.GetJson("select * from Tickets");
        }

        [HttpPost]
        public bool PostTicket(Tickets nuevoTicket)
        {
            string query = $"insert into Tickets values (null,'{nuevoTicket.Titulo}','{nuevoTicket.Descripcion}','Pendiente','{nuevoTicket.Autor}','','{DateTime.Now.ToString()}','','{nuevoTicket.Area}','S')";
            return DbFunctionsSqlite.Exec(query);
        }

        //[HttpDelete]
        //public bool DeleteTicket(int id)
        //{
        //    string query = "update Tickets set Visible = 'N' where id = " + id;
        //    return DbFunctionsSqlite.Exec(query);
        //}

        //modifica botones enCurso, Terminado y Rechazado
        [HttpPut]
        public bool UpdateTicket(int Id, Tickets ticket)
        {
            string fechaCierre = DateTime.Now.ToString();

            string query = $"update Tickets set Estado = '{ticket.Estado}', Asignado = '{ticket.Asignado}', FechaCierre = '{fechaCierre}' where id = {Id}";
            return DbFunctionsSqlite.Exec(query);
        }


        [HttpGet("curso")]
        public bool UpdateTicketCurso(int Id, string asignado)
        {
            string query = $"update Tickets set Estado = 'En Curso', Asignado = '{asignado}' where id = {Id}";
            return DbFunctionsSqlite.Exec(query);
        }



    }
}
