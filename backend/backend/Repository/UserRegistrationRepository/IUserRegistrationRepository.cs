using backend.Models;

namespace backend.Repository.UserRegistrationRepository
{
    public interface IUserRregistrationRepository
    {
        Task<object>RegisterUser(int competitionId,string userId,string userEmail);
        Task<List<Competition>>GetRegisterUserCompetition(string userId);
    }
}