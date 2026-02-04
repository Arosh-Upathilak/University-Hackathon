using backend.Data;
using backend.Dtos.CodingProblemDtos;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.CodingProblemsRepository
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

            var competition = await _context.Competitions
            .FirstOrDefaultAsync(co => co.CompetitionId == competitionProblem.CompetitionId);

            if (competition == null)
            {
                throw new Exception("Competition not found");
            }

            competition.NumberOfQuestions += 1;

            _context.CompetitionProblems.Add(competitionProblem);
            _context.Competitions.Update(competition);

            await _context.SaveChangesAsync();

            return competitionProblem;
        }


        public async Task<CompetitionProblem> UpdateCodingProblems(CompetitionProblem competitionProblem)
        {
            await _context.SaveChangesAsync();
            return competitionProblem;
        }

        public async Task<CompetitionProblem?> GetCodingProblemsByIdForUpdate(int competitionId,int problemId)
        {
            return await _context.CompetitionProblems
                .Include(cp => cp.TestCases)
                .FirstOrDefaultAsync(cp =>
                    cp.CompetitionId == competitionId &&
                    cp.CompetitionProblemId == problemId);
        }

        public void RemoveTestCases(IEnumerable<TestCase> testCases)
        {
            _context.TestCases.RemoveRange(testCases);
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
                .Include(cp => cp.TestCases)
                .FirstOrDefaultAsync(cp =>
                    cp.CompetitionId == competitionId &&
                    cp.CompetitionProblemId == problemId);

            if (problem == null)
            {
                throw new Exception("Coding problem not found");
            }

            var competition = await _context.Competitions
                .FirstOrDefaultAsync(c => c.CompetitionId == competitionId);

            if (competition == null)
            {
                throw new Exception("Competition not found");
            }

            if (competition.NumberOfQuestions > 0)
            {
                competition.NumberOfQuestions -= 1;
            }

            if (problem.TestCases != null && problem.TestCases.Any())
            {
                _context.TestCases.RemoveRange(problem.TestCases);
            }

            _context.CompetitionProblems.Remove(problem);
            _context.Competitions.Update(competition);

            await _context.SaveChangesAsync();
        }
        public async Task<object> GetCompetitionProblemById(int competitionId, int questionId, string userId)
        {
            var result = await _context.CompetitionProblems
                .Where(cp =>
                    cp.CompetitionId == competitionId &&
                    cp.CompetitionProblemId == questionId
                )
                .Select(cp => new
                {
                    Problem = new
                    {
                        cp.CompetitionProblemId,
                        cp.CompetitionId,
                        cp.Title,
                        cp.Description,
                        cp.DifficultyLevel,
                        cp.TotalPoints,
                        cp.AnswerLanguage,
                        cp.AnswerCode,

                        TestCases = cp.TestCases.Select(tc => new
                        {
                            tc.TestCaseId,
                            tc.Input,
                            tc.Output,
                            tc.IsHidden
                        }).ToList()
                    },
                    IsRegistered = _context.CompetitionRegistrations.Any(cr =>
                        cr.CompetitionId == cp.CompetitionId &&
                         cr.StudentId == userId)
                })
                .FirstOrDefaultAsync();

            if (result == null)
                throw new KeyNotFoundException("Problem not found");

            if (!result.IsRegistered)
                throw new UnauthorizedAccessException("User is not registered");

            return result.Problem;
        }

        public async Task<object?> GetProblemHiddenTestCase(int competitionId, int questionId, string userId)
        {
            var isRegister = await _context.CompetitionRegistrations.AnyAsync(cr => cr.CompetitionId == competitionId && cr.StudentId == userId);
            if (!isRegister)
            {
                throw new UnauthorizedAccessException();
            }

            var result = await _context.CompetitionProblems
                .Where(cp =>
                    cp.CompetitionId == competitionId &&
                    cp.CompetitionProblemId == questionId)
                .Select(cp => new
                {
                    cp.TotalPoints,
                    HiddenTestCaseCount = cp.TestCases.Count(tc => tc.IsHidden),
                    TestCase = cp.TestCases
                            .Where(tc => tc.IsHidden)
                            .Select(tc => new
                            {
                                tc.Input,
                                tc.Output
                            })
                            .ToList()
                })
                .FirstOrDefaultAsync();

            return result;
        }

    }
}