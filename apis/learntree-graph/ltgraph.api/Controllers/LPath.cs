
using ltgraph.domain.DTOs;
using ltgraph.domain.Interfaces;
using ltgraph.infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ltgraph.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles="lt-graph-root")]
    public class LPath : ControllerBase
    {
        private readonly ILogger<LPath> _logger;
        private readonly ILPathRepository _lpathRepo;
        public LPath(ILogger<LPath> logger, ILPathRepository lpathRepo)
        {
            _logger = logger;
            _lpathRepo = lpathRepo;
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
            _lpathRepo.CreateLearningPath(lPath);
            return Ok("Received");
        }
    }
}