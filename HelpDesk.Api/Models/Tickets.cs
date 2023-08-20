namespace HelpDesk.Api.Models
{
    public class Tickets
    {
        public int Id { get; set; }
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        public string? Estado { get; set; }
        public string? Autor { get; set; }
        public string? Asignado { get; set; }
        public string? FechaAlta { get; set; }
        public string? FechaCierre { get; set; }
        public string? Area { get; set; }
        public string? Visible { get; set; }
    }
}
