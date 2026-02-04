using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Service.UserService
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _config;

        public UserService(IConfiguration config)
        {
            _config = config;
        }
        public string GenerateJwtToken(User user){
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer:_config["Jwt:Issuer"],
                audience:_config["Jwt:Audience"],
                claims:claims,
                expires: DateTime.UtcNow.AddDays(2),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}