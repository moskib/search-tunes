using System;
namespace search_tunes.Entities.Dtos
{
    public class SearchResultDto
    {
        public string Kind { get; set; }
        public string ArtistName { get; set; }
        public int TrackId { get; set; }
        public string TrackName { get; set; }
        public string PreviewUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ArtWorkUrl100 { get; set; }
    }
}
