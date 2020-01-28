using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using search_tunes.Entities.Models;
using search_tunes.Persistance;
using search_tunes.Core.Repositories;

namespace search_tunes
{
    public class AuthRepository : Repository<User>, IAuthRepository
    {
        public AuthRepository(ApplicationDbContext context) : base(context)
        {
        }

        public ApplicationDbContext context
        {
            get { return Context as ApplicationDbContext; }
        }

        public async Task<User> Login(string userEmail, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(el => el.Email == userEmail);

            if (user == null)
                return null;

            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash;
            byte[] passwordSalt;

            CreatePassowrdHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await context.Users.AddAsync(user);

            return user;
        }

        private void CreatePassowrdHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string userEmail)
        {
            return await context.Users.AnyAsync(user => user.Email == userEmail);
        }
    }
}
