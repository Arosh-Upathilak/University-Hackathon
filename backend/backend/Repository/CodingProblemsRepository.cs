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
            _context.CompetitionProblems.Add(competitionProblem);
            await _context.SaveChangesAsync();
            return competitionProblem;
        }
    }
}