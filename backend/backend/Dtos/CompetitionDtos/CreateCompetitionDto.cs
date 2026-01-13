namespace backend.Dtos.CompetitionDtos
{
    public class CreateCompetitionDto
    {
        public string CompetitionName { get; set; } = string.Empty;
        public string CompetitionTagLine { get; set; } = string.Empty;
        public string CompetitionDescription { get; set; } = string.Empty;
        public string CompetitionImageLink { get; set; } = string.Empty;

        public DateTime CompetitionStartDateTime { get; set; }
        public DateTime CompetitionEndDateTime { get; set; }
        public DateTime CompetitionRegistrationEndDateTime { get; set; }

        public bool CompetitionIsVisibleForStudents { get; set; }
        public string CompetitionRules { get; set; } = string.Empty;
    }
}