using System.Security.Claims;
using backend.Dtos.CodingProblemDtos;
using backend.Models;
using backend.Repository.CodingProblemsRepository;
using backend.Repository.CompetitionRepository;
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
        private readonly ICompetitionRepository _icompetitionrepository;
        public CodingProblemController(ICodingProblemsRepository codingProblemsRepository, ICompetitionRepository icompetitionrepository)
        {
            _codingProblemsRepository = codingProblemsRepository;
            _icompetitionrepository = icompetitionrepository;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{id}/CreateProblems")]
        public async Task<IActionResult> CreateCodingProblems(int id, CreateCodingProblemsDto createCodingProblemsDto)
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

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/UpdateProblem/{problemId}")]
        public async Task<IActionResult> UpdateProblem(int id,int problemId,UpdateCodingProblemsDto updateCodingProblemsDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingProblem = await _codingProblemsRepository
                .GetCodingProblemsByIdForUpdate(id, problemId);

            if (existingProblem == null)
                return NotFound("Problem not found");

            existingProblem.Title = updateCodingProblemsDto.Title;
            existingProblem.DifficultyLevel = updateCodingProblemsDto.DifficultyLevel;
            existingProblem.TotalPoints = updateCodingProblemsDto.TotalPoints;
            existingProblem.Description = updateCodingProblemsDto.Description;
            existingProblem.AnswerCode = updateCodingProblemsDto.AnswerCode;
            existingProblem.AnswerLanguage = updateCodingProblemsDto.AnswerLanguage;

            _codingProblemsRepository.RemoveTestCases(existingProblem.TestCases);

            existingProblem.TestCases = updateCodingProblemsDto.TestCases.Select(tc => new TestCase
            {
                CompetitionId = id,
                CompetitionProblemId = problemId,
                Input = tc.Input,
                Output = tc.Output,
                IsHidden = tc.IsHidden
            }).ToList();

            var result = await _codingProblemsRepository.UpdateCodingProblems(existingProblem);

            if (result == null)
                return BadRequest("Failed to update problem");

            return Ok(new
            {
                success = true,
                competitionId = result.CompetitionProblemId,
                message = "Problem updated successfully"
            });
        }

        [Authorize]
        [HttpGet("{id}/GetProblems/{problemId}")]
        public async Task<IActionResult> GetCodingProblems(int id, int problemId)
        {
            var problems = await _codingProblemsRepository.GetCodingProblemsById(id, problemId);

            if (problems == null) return BadRequest("No problems found");

            return Ok(problems);
        }

        [Authorize]
        [HttpGet("{id}/GetAllProblems")]
        public async Task<IActionResult> GetAllCodingProblems(int id)
        {
            var problems = await _codingProblemsRepository.GetAllCodingProblems(id);

            return Ok(new
            {
                success = true,
                problems = problems
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}/DeleteProblem/{problemId}")]
        public async Task<IActionResult> DeleteCodingProblem(int id, int problemId)
        {
            var problem = await _codingProblemsRepository.GetCodingProblemsById(id, problemId);
            if (problem == null) return NotFound("Problem not found");

            await _codingProblemsRepository.DeleteCodingProblems(id, problemId);

            return Ok(new
            {
                success = true,
                message = "Problem deleted successfully"
            });
        }


        //

    }
}