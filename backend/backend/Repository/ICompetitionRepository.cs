using backend.Models;

namespace backend.Repository
{
    public interface  ICompetitionRepository
    {
        Task<Competition> CreateCompetition(Competition competition);
        Task<Competition?> GetCompetitionById(int id);
        Task<Competition> UpdateCompetition(Competition competition);
        Task DeleteCompetition(Competition competition);
        Task<List<Competition>> GetAllCompetitions();
    }
}