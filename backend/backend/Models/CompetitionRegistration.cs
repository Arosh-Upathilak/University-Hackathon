using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CompetitionRegistration
    {
        public int CompetitionRegistrationId { get; set; }

        [Required]
        public string StudentId { get; set; } = string.Empty;
        public string StudentName { get; set; } = string.Empty;

        [Required]
        public int CompetitionId { get; set; }

        public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    }
}
