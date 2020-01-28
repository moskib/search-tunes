using System.Threading.Tasks;
using search_tunes.Core.Repositories;
using search_tunes.Entities.Models;
using search_tunes.Persistance;

namespace search_tunes
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            Users = new Repository<User>(_context);
            Auth = new AuthRepository(_context);
            Searches = new Repository<Search>(_context);
        }

        public IRepository<User> Users { get; private set; }
        public IAuthRepository Auth { get; private set; }
        public IRepository<Search> Searches { get; private set; }
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}
