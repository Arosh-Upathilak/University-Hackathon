using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.CodingSubmitDtos
{
    public class CodeSubmitDto
    {
        [Required]
        public string language {get;set;}
         [Required]
        public string sourceCode {get;set;}
    }
}