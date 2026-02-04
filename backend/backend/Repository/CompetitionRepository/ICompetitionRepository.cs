using backend.Models;

namespace backend.Repository.CompetitionRepository
{
    public interface  ICompetitionRepository
    {
        Task<Competition> CreateCompetition(Competition competition);
        Task<Competition?> GetCompetitionById(int id);
        Task<Competition> UpdateCompetition(Competition competition);
        Task DeleteCompetition(Competition competition);
        Task<List<Competition>> GetAllCompetitions();
        Task<List<Competition>> GetUserAllCompetitions(string userId);

    }
}