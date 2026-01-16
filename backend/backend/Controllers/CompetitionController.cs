using System.Security.Claims;
using backend.Dtos.CompetitionDtos;
using backend.Models;
using backend.Service;
using backend.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CompetitionController : ControllerBase
    {
        private readonly ICompetitionRepository _icompetitionrepository;
        private readonly ICloudinaryService _icloudinaryservice ;
        public CompetitionController(ICompetitionRepository icompetitionrepository,ICloudinaryService icloudinaryservice)
        {
            _icompetitionrepository = icompetitionrepository;
            _icloudinaryservice = icloudinaryservice;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("CreateCompetition")]
        public async Task<IActionResult> CreateCompetition(CreateCompetitionDto createCompetitionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var competition = new Competition
            {
                CompetitionName = createCompetitionDto.CompetitionName,
                CompetitionTagLine = createCompetitionDto.CompetitionTagLine,
                CompetitionDescription = createCompetitionDto.CompetitionDescription,
                CompetitionImageLink = createCompetitionDto.CompetitionImageLink,
                StartDateTime = createCompetitionDto.CompetitionStartDateTime,
                EndDateTime = createCompetitionDto.CompetitionEndDateTime,
                RegistrationEndDateTime = createCompetitionDto.CompetitionRegistrationEndDateTime,
                IsVisibleForStudents = createCompetitionDto.CompetitionIsVisibleForStudents,
                Rules = createCompetitionDto.CompetitionRules,
                CreatedByUserId = userId,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _icompetitionrepository.CreateCompetition(competition);
            
            return Ok(new
            {
                success = true,
                competitionId = result.CompetitionId,
                message = "Competition created successfully"
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("UpdateCompetition/{id}")]
        public async Task<IActionResult> UpdateCompetition(int id, UpdateCompetitionDto updateCompetitionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var competition = await _icompetitionrepository.GetCompetitionById(id);
            if (competition == null) return NotFound();

            string oldLink = competition.CompetitionImageLink;

            if ( !string.IsNullOrWhiteSpace(oldLink) && oldLink != updateCompetitionDto.CompetitionImageLink){
                await _icloudinaryservice.DeleteCloudinaryImage(competition.CompetitionImageLink); 
            }

            competition.CompetitionName = updateCompetitionDto.CompetitionName;
            competition.CompetitionTagLine = updateCompetitionDto.CompetitionTagLine;
            competition.CompetitionDescription = updateCompetitionDto.CompetitionDescription;
            competition.CompetitionImageLink = updateCompetitionDto.CompetitionImageLink;
            competition.StartDateTime = updateCompetitionDto.StartDateTime;
            competition.EndDateTime = updateCompetitionDto.EndDateTime;
            competition.RegistrationEndDateTime = updateCompetitionDto.RegistrationEndDateTime;
            competition.IsVisibleForStudents = updateCompetitionDto.IsVisibleForStudents;
            competition.Rules = updateCompetitionDto.Rules;

            var result = await _icompetitionrepository.UpdateCompetition(competition);

            return Ok(new
            {
                success = true,
                competitionId = result.CompetitionId,
                message = "Competition updated successfully"
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteCompetition/{id}")]
        public async Task<IActionResult> DeleteCompetition(int id)
        {
            var competition = await _icompetitionrepository.GetCompetitionById(id);
            if (competition == null) return NotFound();
            
            await _icompetitionrepository.DeleteCompetition(competition);

            return Ok(new
            {
                success = true,
                message = "Competition deleted successfully"
            });
        }

        [Authorize]
        [HttpGet("GetAllCompetitions")]
        public async Task<IActionResult> GetAllCompetitions()
        {
            var competitions = await _icompetitionrepository.GetAllCompetitions();

            return Ok(new
            {
                success = true,
                competitions = competitions
            });
        }

        [Authorize]
        [HttpGet("GetCompetitionById/{id}")]
        public async Task<IActionResult> GetCompetitionById(int id)
        {
            var competition = await _icompetitionrepository.GetCompetitionById(id);
            if (competition == null) return NotFound();

            return Ok(new
            {
                success = true,
                competition = competition
            });
        }
    }
}