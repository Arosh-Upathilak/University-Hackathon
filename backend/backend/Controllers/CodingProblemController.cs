using System.Security.Claims;
using backend.Dtos.CodingProblemDtos;
using backend.Models;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CodingProblemController : ControllerBase
    {
        private readonly ICodingProblemsRepository _codingProblemsRepository;
        public CodingProblemController(ICodingProblemsRepository codingProblemsRepository)
        {
            _codingProblemsRepository = codingProblemsRepository;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/CreateProblems")]
        public async Task<IActionResult> CreateCodingProblems(int id,CreateCodingProblemsDto createCodingProblemsDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var problem = new CompetitionProblem
            {
                CompetitionId = id,
                Title = createCodingProblemsDto.Title,
                DifficultyLevel = createCodingProblemsDto.DifficultyLevel,
                TotalPoints = createCodingProblemsDto.TotalPoints,
                Description = createCodingProblemsDto.Description,
                AnswerCode = createCodingProblemsDto.AnswerCode,
                AnswerLanguage = createCodingProblemsDto.AnswerLanguage,
                TestCases = createCodingProblemsDto.TestCases.Select(tc => new TestCase
                {
                    Input = tc.Input,
                    Output = tc.Output,
                    IsHidden = tc.IsHidden
                }).ToList()
            };

            var result = await _codingProblemsRepository.CreateCodingProblems(problem);

            if (result == null) return BadRequest("Failed to create problem");

            return Ok(new
            {
                success = true,
                competitionId = result.CompetitionProblemId,
                message = "Problem created successfully"
            });
        }

    }
}