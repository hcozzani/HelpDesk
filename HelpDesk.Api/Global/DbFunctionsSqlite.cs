using Microsoft.Data.Sqlite;
using Newtonsoft.Json;
using System.Data;

namespace HelpDesk.Api.Global
{
    public static class DbFunctionsSqlite
    {

        public static string GetJson(string request)
        {
            string response = string.Empty;
            DataTable dt = new DataTable();
            SqliteConnection cnn = new SqliteConnection(Connection.ConnectionString);
            cnn.Open();
            SqliteCommand mycommand = new SqliteCommand(request, cnn);
            mycommand.CommandText = request;
            SqliteDataReader reader = mycommand.ExecuteReader();
            dt.Load(reader);
            response = JsonConvert.SerializeObject(dt, Formatting.Indented);
            reader.Close();
            cnn.Close();
            return response;
        }

        public static bool Exec(string query)
        {
            bool response = false;
            SqliteConnection Conn = new SqliteConnection(Connection.ConnectionString);
            SqliteCommand Command = new SqliteCommand(query, Conn);
            Conn.Open();

            try
            {
                Command.ExecuteNonQuery();
                response = true;
            }
            catch (Exception)
            {
                response = false;
            }

            Conn.Close();

            return response;
        }

    }
}
