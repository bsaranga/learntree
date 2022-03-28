using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learntree_graph.infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace leantree_graph.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LPath : ControllerBase
    {
        private readonly ILogger<LPath> _logger;
        private readonly IGraphCore _graph;
        public LPath(ILogger<LPath> logger, IGraphCore graph)
        {
            _logger = logger;
            _graph = graph;
        }

        [HttpGet]
        public IActionResult Root() {
            return Ok("Root endpoint");
        }

        [HttpPost]
        public async Task<IActionResult> CreateNode(string label, [FromBody] Dictionary<string,string> props)
        {
            await _graph.CreateNode(label, props);
            return Ok();
        }
    }
}