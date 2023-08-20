namespace HelpDesk.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Usuario { get; set; }
        public string? Clave { get; set; }
        public int Rol { get; set; }
        public string? Estado { get; set; }
        public string? Area { get; set; }
    }
}
