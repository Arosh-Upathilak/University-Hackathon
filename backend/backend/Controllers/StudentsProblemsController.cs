using System.Security.Claims;
using backend.Dtos.CodingSubmitDtos;
using backend.Repository.CodingProblemsRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsProblemsController : ControllerBase
    {
        private readonly ICodingProblemsRepository _codingProblemsRepository;
        public StudentsProblemsController(ICodingProblemsRepository codingProblemsRepository)
        {
            _codingProblemsRepository = codingProblemsRepository;
        }

        [Authorize(Roles = "User")]
        [HttpGet("GetCompetitionProblems/{competitionId}/{questionId}")]
        public async Task<IActionResult> GetProblemById(int competitionId, int questionId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();
            var problem = await _codingProblemsRepository.GetCompetitionProblemById(competitionId, questionId, userId);
            return Ok(new
            {
                success = true,
                problem
            });
        }

        [Authorize(Roles = "User")]
        [HttpPost("GetCompetitionHiddenTestCase/{competitionId}/{questionId}")]
        public async Task<IActionResult> GetProblemHiddenTestCase(int competitionId, int questionId, CodeSubmitDto codeSubmitDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var hiddenTestCase = await _codingProblemsRepository.GetProblemHiddenTestCase(competitionId, questionId, userId);
            return Ok(new
            {
                success = true,
                hiddenTestCase
            });
        }

    }
}