using System;
using System.Collections;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using search_tunes.Entities.Dtos;

namespace search_tunes.Controllers
{

    [Route("api/[controller]")]
    public class SearchController: ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;

        public SearchController(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        [HttpPost] // api/search/
        public async Task<ActionResult<SearchResult[]>> Search([FromBody]JObject data)
        {
            var term = data["body"].ToString();
            if (string.IsNullOrEmpty(term))
                return BadRequest("The request did not include a term");

            var request = new HttpRequestMessage(HttpMethod.Get,
                $"search?term={term}");

            var client = _clientFactory.CreateClient("itunes");


            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                //using var responseStream = await response.Con
                var responseStream = await response.Content.ReadAsStringAsync();

                var obj = (JObject)JsonConvert.DeserializeObject(responseStream);

                var searchResults = obj["results"].ToObject<SearchResult[]>();

                return Ok(searchResults);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }

        }
    }
}
