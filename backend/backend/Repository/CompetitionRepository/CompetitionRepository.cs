using backend.Data;
using backend.Models;
using backend.Service.CloudinaryService;
using Microsoft.EntityFrameworkCore;


namespace backend.Repository.CompetitionRepository
{
    public class CompetitionRepository : ICompetitionRepository
    {
        private readonly AppDbContext _context;
        private readonly ICloudinaryService _icloudinaryservice;
        public CompetitionRepository(AppDbContext context, ICloudinaryService icloudinaryservice)
        {
            _context = context;
            _icloudinaryservice = icloudinaryservice;
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
            await _icloudinaryservice.DeleteCloudinaryImage(competition.CompetitionImageLink);
            _context.Competitions.Remove(competition);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Competition>> GetAllCompetitions()
        {
            return await _context.Competitions.ToListAsync();
        }

        public async Task<List<Competition>> GetUserAllCompetitions(string userId)
        {
            return await _context.Competitions
                .Where(c =>
                        c.IsVisibleForStudents &&
                        !c.Registrations.Any(r => r.StudentId == userId)
                    ).ToListAsync();
        }
    }
}