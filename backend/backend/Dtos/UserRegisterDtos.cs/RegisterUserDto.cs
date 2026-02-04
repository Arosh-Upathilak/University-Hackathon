using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.UserRegisterDtos
{
    public class RegisterUserDto
    {
        [Required]
        public int CompetitionId {get;set;}
    }
}