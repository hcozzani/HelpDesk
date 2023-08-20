using HelpDesk.Api.Global;
using HelpDesk.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace HelpDesk.Api.Controllers
{
    [Route("api/areas")]
    [ApiController]
    public class AreasController : ControllerBase
    {
        [HttpGet]
        public string GetAreas()
        {
            return DbFunctionsSqlite.GetJson("select * from Areas");
        }

        [HttpPost]
        public bool PostArea(Area area)
        {
            string query = "insert into Areas values (null,'" +
                area.Nombre + "','" +
                area.Descripcion + "','" +
                area.Jefe + "','True');";
            return DbFunctionsSqlite.Exec(query);
        }

		[HttpPut]
		public bool PutArea(Area area)
		{
			string query = "update Areas set Nombre = '" +
				area.Nombre + "' , Descripcion = '" +
				area.Descripcion + "' , Jefe = '" +
				area.Jefe + "' , Estado = '" + 
				area.Estado + "' where Id = " +
				area.Id; // Agrega la cláusula WHERE para especificar el Id del área a actualizar
			return DbFunctionsSqlite.Exec(query);
		}


        [HttpDelete]
        public bool DeleteArea(int id)
        {
            string query = "delete from Areas where Id = " + id;
            return DbFunctionsSqlite.Exec(query);
        }
    }
}
