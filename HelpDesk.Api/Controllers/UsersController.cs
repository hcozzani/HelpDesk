using HelpDesk.Api.Global;
using HelpDesk.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace HelpDesk.Api.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpGet]
        public string GetUsers()
        {
            return DbFunctionsSqlite.GetJson("select * from Users");
        }

        [HttpGet("areas")]
        public string GetAreas()
        {
            return DbFunctionsSqlite.GetJson("select Nombre from Areas");
        }

        [HttpGet("getuserbyarea")]
        public string GetUserByArea(string area)
        {
            return DbFunctionsSqlite.GetJson("select * from Users where Area = '"+area+"'");
        }

        [HttpPost]
        public bool PostUsers(User nuevoUsuario)
        {

            bool respuesta = DbFunctionsSqlite.Exec("insert into Users values (null,'" +
                nuevoUsuario.Usuario + "','" +
                nuevoUsuario.Clave + "','" +
                nuevoUsuario.Rol + "','" +
                nuevoUsuario.Estado + "','" +
                nuevoUsuario.Area + "')");

            if (respuesta)
            {
                return respuesta;
            }
            else
            {
                //hacemos un insert en la tabla de reporte
                return respuesta;
            }

        }

        [HttpPut]
        public bool PutUsers(User usuarioActualizar)
        {
            bool respuesta = DbFunctionsSqlite.Exec("Update Users set Clave = '"
                + usuarioActualizar.Clave + "', Rol = '"
                + usuarioActualizar.Rol + "', Estado = '"
                + usuarioActualizar.Estado + "', Area = '"
                + usuarioActualizar.Area + "' where Id = " + usuarioActualizar.Id);

            if (respuesta)
            {
                return respuesta;
            }
            else
            {
                //hacemos un insert en la tabla de reporte
                return respuesta;
            }

            return respuesta;
        }

        [HttpDelete]
        public bool DeleteUsers(int id)
        {
            return DbFunctionsSqlite.Exec("delete from Users where Id = " + id);
        }


    }
}
