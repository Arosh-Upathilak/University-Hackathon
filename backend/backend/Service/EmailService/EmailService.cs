using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using backend.Models;

namespace backend.Service.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> settings)
    {
        _settings = settings.Value;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var client = new SmtpClient(_settings.Host, _settings.Port)
        {
            Credentials = new NetworkCredential(
                _settings.FromEmail,
                _settings.Password
            ),
            EnableSsl = _settings.EnableSSL
        };

        var message = new MailMessage
        {
            From = new MailAddress(_settings.FromEmail),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        message.To.Add(toEmail);

        await client.SendMailAsync(message);
    }
    }
}