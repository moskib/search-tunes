using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using search_tunes.Core.Repositories;
using search_tunes.Entities.Models;

namespace search_tunes
{
    public interface IUnitOfWork : IDisposable
    {
        IAuthRepository Auth { get; }
        Task<int> SaveChangesAsync();

        IRepository<User> Users { get; }
        IRepository<Search> Searches { get; }
    }
}