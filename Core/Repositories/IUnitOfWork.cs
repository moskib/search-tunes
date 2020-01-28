using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using search_tunes.Core.Repositories;

namespace search_tunes
{
    public interface IUnitOfWork : IDisposable
    {
        IAuthRepository Auth { get; }
        Task<int> SaveChangesAsync();
    }
}