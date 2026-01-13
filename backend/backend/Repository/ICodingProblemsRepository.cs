using backend.Dtos.CodingProblemDtos;
using backend.Models;

namespace backend.Repository
{
    public interface ICodingProblemsRepository
    {
        Task<CompetitionProblem> CreateCodingProblems(CompetitionProblem competitionProblem);
        Task<CompetitionProblem> UpdateCodingProblems(CompetitionProblem competitionProblem);
        Task<CompetitionProblem?> GetCodingProblemsById(int competitionId, int problemId);
        Task<List<CompetitionProblem>> GetAllCodingProblems(int competitionId);
        Task DeleteCodingProblems(int competitionId, int problemId);
    }
}