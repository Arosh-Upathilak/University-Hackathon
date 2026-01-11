using System.ComponentModel.DataAnnotations;
using backend.Models;

namespace backend.Dtos.CodingProblemDtos
{
    public class CreateCodingProblemsDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        [EnumDataType(typeof(ChallengeDifficultyLevel))]
        public ChallengeDifficultyLevel DifficultyLevel { get; set; }

        [Range(0, int.MaxValue)]
        public int TotalPoints { get; set; }

        public string Description { get; set; } = string.Empty;

        public string AnswerCode { get; set; } = string.Empty;
        public string AnswerLanguage { get; set; } = string.Empty;

        public List<CreateTestCaseDto> TestCases { get; set; } = new List<CreateTestCaseDto>();
    }

    public class CreateTestCaseDto
    {
        public string Input { get; set; } = string.Empty;
        public string Output { get; set; } = string.Empty;
        public bool IsHidden { get; set; } = false;
    }
}
