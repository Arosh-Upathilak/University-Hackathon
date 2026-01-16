using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Competition
    {
        public int CompetitionId { get; set; }
        [Required]
        public string CreatedByUserId { get; set; } = string.Empty;
        public User CreatedByUser { get; set; } = null!;
        public string CompetitionName { get; set; } = string.Empty;
        public string CompetitionTagLine { get; set; } = string.Empty;
        public string CompetitionDescription { get; set; } = string.Empty;
        public string CompetitionImageLink { get; set; } = string.Empty;
        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime RegistrationEndDateTime { get; set; }
        public bool IsVisibleForStudents { get; set; }
        public int NumberOfQuestions { get; set; }
        public string Rules { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<CompetitionProblem> Problems { get; set; } = new List<CompetitionProblem>();
        public ICollection<CompetitionRegistration> Registrations { get; set; }= new List<CompetitionRegistration>();
    }
}
