using System;
using System.Threading.Tasks;
using search_tunes.Entities.Models;

namespace search_tunes.Core.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string userEmail, string password);
        Task<bool> UserExists(string userEmail);
    }
}
