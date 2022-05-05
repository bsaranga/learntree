
using learntree_graph.domain.DTOs;
using learntree_graph.infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace leantree_graph.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles="lt-graph-root")]
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
        [AllowAnonymous]
        public IActionResult Root() {
            return Ok(new {
                Result = "Success"
            });
        }

        [HttpGet("secured")]
        public IActionResult Secured() {
            return Ok(new {
                Result = "Secured end-point accessed"
            });
        }

        [HttpPost("create")]
        [AllowAnonymous]
        public IActionResult CreateLearningPath([FromBody] LearningPath lPath) {
            return Ok("Received");
        }

        [HttpDelete("all")]
        public async Task<IActionResult> DeleteAndDetachAll() {
            await _graph.DetachDeleteAllNodes();
            return Ok();
        }
    }
}