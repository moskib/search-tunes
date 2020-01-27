﻿using System;
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
    public class SearchController : ControllerBase
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
                $"search?term={term}&limit=200");

            var client = _clientFactory.CreateClient("itunes");


            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();

                var deserialized = (JObject)JsonConvert.DeserializeObject(responseStream);

                var searchResults = deserialized["results"].ToObject<SearchResult[]>();

                return Ok(searchResults);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetRecord(int id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
                $"lookup?id={id}");
            var client = _clientFactory.CreateClient("itunes");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseStream = await response.Content.ReadAsStringAsync();

                var deserialized = (JObject)JsonConvert.DeserializeObject(responseStream);

                var result = deserialized["results"][0].ToObject<SearchResult>();

                return Ok(result);
            }
            else
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
