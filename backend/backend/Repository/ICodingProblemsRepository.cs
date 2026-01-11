using backend.Dtos.CodingProblemDtos;
using backend.Models;

namespace backend.Repository
{
    public interface ICodingProblemsRepository
    {
        Task<CompetitionProblem> CreateCodingProblems(CompetitionProblem competitionProblem);
    }
}