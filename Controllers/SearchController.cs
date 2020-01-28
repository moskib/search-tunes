using System;
using System.Collections;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using search_tunes.Entities.Dtos;
using search_tunes.Entities.Models;

namespace search_tunes.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IUnitOfWork _repo;

        public SearchController(IHttpClientFactory clientFactory, IUnitOfWork repo)
        {
            _clientFactory = clientFactory;
            _repo = repo;
        }

        [AllowAnonymous]
        [HttpPost] // api/search/
        public async Task<ActionResult<SearchResultDto[]>> Search([FromBody]JObject data)
        {
            var term = data["body"].ToString();
            if (string.IsNullOrEmpty(term))
                return BadRequest("The request did not include a term");

            var request = new HttpRequestMessage(HttpMethod.Get,
                $"search?term={term}&limit=200");

            var client = _clientFactory.CreateClient("itunes");


            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();

                var deserialized = (JObject)JsonConvert.DeserializeObject(responseStream);

                var searchResults = deserialized["results"].ToObject<SearchResultDto[]>();

                return Ok(searchResults);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }

        }

        [AllowAnonymous]
        [HttpGet("{id}")] // api/search/5
        public async Task<ActionResult<SearchResultDto>> GetRecord(int id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"lookup?id={id}");
            var client = _clientFactory.CreateClient("itunes");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();

                var deserialized = (JObject)JsonConvert.DeserializeObject(responseStream);

                var result = deserialized["results"][0].ToObject<SearchResultDto>();

                return Ok(result);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPost("submit-search")]
        public async Task<ActionResult> SubmitSearch([FromBody]UserSearchDto userSearch)
        {
            string userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var res = await _repo.Searches.FirstOrDefaultAsync(el => el.UserId == Guid.Parse(userID) && el.Term == userSearch.SearchTerm);

            if (res == null)
            {
                _repo.Searches.Add(new Search
                {
                    Term = userSearch.SearchTerm,
                    AmountOfSearchTimes = 1,
                    UserId = Guid.Parse(userID),
                });
            }
            else
            {
                res.AmountOfSearchTimes++;
                _repo.Searches.Update(res);
            }

            await _repo.SaveChangesAsync();

            return Ok();
        }

        //[HttpGet("top-searches")]
        //public async Task<ActionResult<IEnumerable<Search>>> GetTopSearches()
        //{
        //    return Ok();
        //}
    }
}
