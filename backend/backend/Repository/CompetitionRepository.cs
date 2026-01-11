using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;


namespace backend.Repository
{
    public class CompetitionRepository: ICompetitionRepository
    {
        private readonly AppDbContext _context;
        public CompetitionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Competition> CreateCompetition(Competition competition)
        {
            _context.Competitions.Add(competition);
            await _context.SaveChangesAsync();
            return competition;
        }

        public async Task<Competition?> GetCompetitionById(int id)
        {
            return await _context.Competitions.FindAsync(id);
        }

        public async Task<Competition> UpdateCompetition(Competition competition)
        {
            _context.Competitions.Update(competition);
            await _context.SaveChangesAsync();
            return competition;
        }

        public async Task DeleteCompetition(Competition competition)
        {
            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Competition>> GetAllCompetitions()
        {
            return await _context.Competitions.ToListAsync();
        }
    }
}