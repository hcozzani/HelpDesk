using HelpDesk.Api.Global;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Api.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public string GetTotales(string estado)
        {
            return DbFunctionsSqlite.GetJson("select count (*) as Total from Tickets where Estado = '" + estado + "'");
        }

        [HttpGet("detalles")]
        public string GetDetalles(string estado)
        {
            return DbFunctionsSqlite.GetJson("select * from Tickets where Estado = '" + estado + "'");
        }
    }
}