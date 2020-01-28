using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using search_tunes.Entities.Dtos;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using search_tunes.Entities.Models;

namespace search_tunes.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUnitOfWork _repo;
        private readonly IConfiguration _config;
        public AuthController(IUnitOfWork unitOfWork, IConfiguration config)
        {
            _repo = unitOfWork;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody]UserForRegistrationDto userForRegistrationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (await _repo.Auth.UserExists(userForRegistrationDto.Email))
                return BadRequest("Email already exists");

            var userToCreate = new User
            {
                Id = Guid.NewGuid(),
                Email = userForRegistrationDto.Email,
            };

            try
            {
                await _repo.Auth.Register(userToCreate, userForRegistrationDto.Password);
                await _repo.SaveChangesAsync();
                return StatusCode(201);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal server error...");
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userFromRepo =
                await _repo.Auth.Login(userForLoginDto.Email, userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // generate token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Email, userFromRepo.Email)
                }),
                Expires = DateTime.Now.AddDays(3),
                SigningCredentials =
                    new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new { tokenString });
        }


    }
}
