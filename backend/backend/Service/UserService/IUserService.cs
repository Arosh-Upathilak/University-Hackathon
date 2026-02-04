using backend.Models;

namespace backend.Service.UserService
{
    public interface IUserService
    {
        public string GenerateJwtToken(User user);
    }
}