using System;
using System.ComponentModel.DataAnnotations;

namespace search_tunes.Entities.Dtos
{
    public class UserSearchDto
    {
        [Required]
        public string SearchTerm { get; set; }
    }
}
