using System.ComponentModel.DataAnnotations;

namespace search_tunes
{
    public class UserForLoginDto
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
