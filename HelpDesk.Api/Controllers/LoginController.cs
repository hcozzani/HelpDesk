using HelpDesk.Api.Global;
using HelpDesk.Api.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace HelpDesk.Api.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public string PostLogin(Login login)
        {
            return DbFunctionsSqlite.GetJson("select Estado,Area,Rol from Users where Usuario = '" + login.Usuario + "' and Clave = '" + login.Clave + "'");
        }
    }
}
