using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TestCase
    {
        public int TestCaseId { get; set; }
        
        [Required]
        public int CompetitionId { get; set; }
        public Competition Competition { get; set; } = null!;
        
        [Required]
        public int CompetitionProblemId { get; set; }
        public CompetitionProblem CompetitionProblem { get; set; } = null!;
        
        public string Input { get; set; } = string.Empty;
        public string Output { get; set; } = string.Empty;
        public bool IsHidden { get; set; } = false;
    }
}
