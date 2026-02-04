using backend.Dtos.CodingProblemDtos;
using backend.Models;

namespace backend.Repository.CodingProblemsRepository
{
    public interface ICodingProblemsRepository
    {
        Task<CompetitionProblem> CreateCodingProblems(CompetitionProblem competitionProblem);
        Task<CompetitionProblem> UpdateCodingProblems(CompetitionProblem competitionProblem);
        Task<CompetitionProblem?> GetCodingProblemsById(int competitionId, int problemId);
        Task<List<CompetitionProblem>> GetAllCodingProblems(int competitionId);
        Task DeleteCodingProblems(int competitionId, int problemId);    
        Task<object> GetCompetitionProblemById(int competitionId,int questionId, string  userId);
        Task<object?> GetProblemHiddenTestCase(int competitionId,int questionId, string  userId);
        Task<CompetitionProblem?> GetCodingProblemsByIdForUpdate(int competitionId,int problemId);
        void RemoveTestCases(IEnumerable<TestCase> testCases);

    }
}