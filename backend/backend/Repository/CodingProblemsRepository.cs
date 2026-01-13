using backend.Data;
using backend.Dtos.CodingProblemDtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CodingProblemsRepository : ICodingProblemsRepository
    {
        private readonly AppDbContext _context;

        public CodingProblemsRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CompetitionProblem> CreateCodingProblems(CompetitionProblem competitionProblem)
        {
            var maxProblemId = await _context.CompetitionProblems
                .Where(cp => cp.CompetitionId == competitionProblem.CompetitionId)
                .MaxAsync(cp => (int?)cp.CompetitionProblemId) ?? 0;
            
            competitionProblem.CompetitionProblemId = maxProblemId + 1;
            
            _context.CompetitionProblems.Add(competitionProblem);
            await _context.SaveChangesAsync();
            return competitionProblem;
        }

        public async Task<CompetitionProblem> UpdateCodingProblems(CompetitionProblem competitionProblem)
        {
             _context.CompetitionProblems.Update(competitionProblem);
            await _context.SaveChangesAsync();
            return competitionProblem;
        }

        public async Task<CompetitionProblem?> GetCodingProblemsById(int competitionId, int problemId)
        {
            return await _context.CompetitionProblems
                .Include(cp => cp.TestCases)
                .AsNoTracking()
                .Select(cp => new CompetitionProblem
                {
                    CompetitionId = cp.CompetitionId,
                    CompetitionProblemId = cp.CompetitionProblemId,
                    Title = cp.Title,
                    DifficultyLevel = cp.DifficultyLevel,
                    TotalPoints = cp.TotalPoints,
                    Description = cp.Description,
                    AnswerCode = cp.AnswerCode,
                    AnswerLanguage = cp.AnswerLanguage,
                    TestCases = cp.TestCases.Select(tc => new TestCase
                    {
                        TestCaseId = tc.TestCaseId,
                        CompetitionId = tc.CompetitionId,
                        CompetitionProblemId = tc.CompetitionProblemId,
                        Input = tc.Input,
                        Output = tc.Output,
                        IsHidden = tc.IsHidden
                    }).ToList()
                })
                .FirstOrDefaultAsync(cp => cp.CompetitionId == competitionId && cp.CompetitionProblemId == problemId);
        }
        public async Task<List<CompetitionProblem>> GetAllCodingProblems(int competitionId)
        {
            return await _context.CompetitionProblems
                .Include(cp => cp.TestCases)
                .Where(cp => cp.CompetitionId == competitionId)
                .AsNoTracking()
                .Select(cp => new CompetitionProblem
                {
                    CompetitionId = cp.CompetitionId,
                    CompetitionProblemId = cp.CompetitionProblemId,
                    Title = cp.Title,
                    DifficultyLevel = cp.DifficultyLevel,
                    TotalPoints = cp.TotalPoints,
                    Description = cp.Description,
                    AnswerCode = cp.AnswerCode,
                    AnswerLanguage = cp.AnswerLanguage,
                    TestCases = cp.TestCases.Select(tc => new TestCase
                    {
                        TestCaseId = tc.TestCaseId,
                        CompetitionId = tc.CompetitionId,
                        CompetitionProblemId = tc.CompetitionProblemId,
                        Input = tc.Input,
                        Output = tc.Output,
                        IsHidden = tc.IsHidden
                    }).ToList()
                })
                .ToListAsync();
        }

        public async Task DeleteCodingProblems(int competitionId, int problemId)
        {
            var problem = await _context.CompetitionProblems
                .FirstOrDefaultAsync(cp => cp.CompetitionId == competitionId && cp.CompetitionProblemId == problemId);
            
            if (problem != null)
            {
                _context.CompetitionProblems.Remove(problem);
                await _context.SaveChangesAsync();
            }
        }
    }
}