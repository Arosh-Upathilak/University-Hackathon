namespace backend.Models
{
    public class EmailSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public string FromEmail { get; set; }
        public string Password { get; set; }
    }

}