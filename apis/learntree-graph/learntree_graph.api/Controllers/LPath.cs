using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using learntree_graph.infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
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
            return Ok(new {
                Result = "Success"
            });
        }

        [Authorize(Roles="lt-graph-root")]
        [HttpGet("secured")]
        public IActionResult Secured() {
            return Ok(new {
                Result = "Secured end-point accessed"
            });
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateNode(string label, [FromBody] Dictionary<string,string> props)
        {
            await _graph.CreateNode(label, props);
            return Ok();
        }

        [HttpDelete("all")]
        public async Task<IActionResult> DeleteAndDetachAll() {
            await _graph.DetachDeleteAllNodes();
            return Ok();
        }
    }
}