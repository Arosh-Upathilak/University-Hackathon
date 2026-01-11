using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class CompetitionProblem
    {
        public int CompetitionProblemId { get; set; }

        [Required]
        public int CompetitionId { get; set; }
        public Competition Competition { get; set; } = null!;

        public string Title { get; set; } = string.Empty;
        public ChallengeDifficultyLevel DifficultyLevel { get; set; }
        public int TotalPoints { get; set; }
        public string Description { get; set; } = string.Empty;

        public string AnswerCode { get; set; } = string.Empty;
        public string AnswerLanguage { get; set; } = string.Empty;

        public ICollection<TestCase> TestCases { get; set; } = new List<TestCase>();
    }
}
