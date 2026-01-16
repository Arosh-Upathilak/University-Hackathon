using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class QuestionCodeSubmission
    {
        public int QuestionCodeSubmissionId { get; set; }
        public int CompetitionId { get; set; }
        public Competition Competition { get; set; } = null!;
        [Required]
        public string StudentId { get; set; } = string.Empty;
        public User Student { get; set; } = null!;
        [Required]
        public int CompetitionProblemId { get; set; }
        public CompetitionProblem CompetitionProblem { get; set; } = null!;
        public string Code { get; set; } = string.Empty;
        public string Language { get; set; } = string.Empty;
        public int Points { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
