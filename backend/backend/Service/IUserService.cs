using backend.Models;

namespace backend.Service
{
    public interface IUserService
    {
        public string GenerateJwtToken(User user);
    }
}