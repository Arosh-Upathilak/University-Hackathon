using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository.UserRegistrationRepository
{
    public class UserRegistrationRepository : IUserRregistrationRepository
    {
        private readonly AppDbContext _context;
        public UserRegistrationRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }

        public async Task<object> RegisterUser(int competitionId,string userId,string userEmail)
        {
            var alreadyRegistered = await _context.CompetitionRegistrations
                .AnyAsync(r =>
                    r.CompetitionId == competitionId &&
                    r.StudentId == userId
                );

            if (alreadyRegistered)
                throw new InvalidOperationException("User already registered");

            var competition = await _context.Competitions
                .FirstOrDefaultAsync(c => c.CompetitionId == competitionId);

            if (competition == null)
                throw new KeyNotFoundException("Competition not found");

            using var transaction = await _context.Database.BeginTransactionAsync();

            var registration = new CompetitionRegistration
            {
                StudentId = userId,
                StudentName = userEmail,
                CompetitionId = competitionId,
                RegisteredAt = DateTime.UtcNow
            };

            _context.CompetitionRegistrations.Add(registration);

            competition.RegisterStudents += 1;
            _context.Competitions.Update(competition);

            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            return new
            {
                registration.CompetitionRegistrationId,
                registration.StudentId,
                registration.StudentName,
                registration.CompetitionId,
                registration.RegisteredAt
            };
        }

        public async  Task<List<Competition>>GetRegisterUserCompetition(string userId)
        {
            var competitions = await _context.CompetitionRegistrations
                .Where(cr => cr.StudentId == userId)
                .Select(cr => cr.Competition)
                .ToListAsync();

            if (competitions == null)
                throw new Exception("No Competitions Register Yet");

            return competitions;
        }
    }
}