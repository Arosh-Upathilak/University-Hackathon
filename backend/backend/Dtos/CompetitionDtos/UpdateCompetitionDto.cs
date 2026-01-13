namespace backend.Dtos.CompetitionDtos
{
    public class UpdateCompetitionDto
    {
        public string CompetitionName { get; set; } = string.Empty;
        public string CompetitionTagLine { get; set; } = string.Empty;
        public string CompetitionDescription { get; set; } = string.Empty;
        public string CompetitionImageLink { get; set; } = string.Empty;

        public DateTime StartDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
        public DateTime RegistrationEndDateTime { get; set; }

        public bool IsVisibleForStudents { get; set; }
        public string Rules { get; set; } = string.Empty;
    }
}