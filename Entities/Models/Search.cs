using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace search_tunes.Entities.Models
{
    public class Search
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string Term { get; set; }
        public int AmountOfSearchTimes { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
    }
}
