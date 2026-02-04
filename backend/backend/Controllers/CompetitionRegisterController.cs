using Microsoft.AspNetCore.Mvc;
using backend.Repository.UserRegistrationRepository;
using Microsoft.AspNetCore.Authorization;
using backend.Dtos.UserRegisterDtos;
using System.Security.Claims;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionRegisterController : ControllerBase
    {
        private readonly IUserRregistrationRepository _iUserRregistration;
        public CompetitionRegisterController(IUserRregistrationRepository iUserRregistration)
        {
            _iUserRregistration = iUserRregistration;
        }

        [Authorize(Roles = "User")]
        [HttpPost("Register/{competitionId}")]
        public async Task<IActionResult> RegisterUser(int competitionId)
        { 
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(userEmail))
                return Unauthorized();

            var result = await _iUserRregistration.RegisterUser(
                competitionId,
                userId,
                userEmail
            );

            return Ok(new
            {
                success = true,
                result
            });
        }

        [Authorize(Roles = "User")]
        [HttpGet("Register/User/Competitions")]
        public async Task<IActionResult> GetUserRegisterCompetitions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }
            var result = await _iUserRregistration.GetRegisterUserCompetition(userId);
            return Ok(new {
                result,
                success = true
            });
        }

    }
}