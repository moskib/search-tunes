using System;
using Microsoft.EntityFrameworkCore;
using search_tunes.Entities.Models;

namespace search_tunes.Persistance
{
    public class ApplicationDbContext: DbContext
    {
		public DbSet<User> Users { get; set; }
        public DbSet<Search> Searches { get; set; }

		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{

		}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder.UseSnakeCaseNamingConvention();
		}
	}
}
