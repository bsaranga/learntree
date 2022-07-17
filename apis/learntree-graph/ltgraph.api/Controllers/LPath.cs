
using ltgraph.domain.DTOs;
using ltgraph.domain.Interfaces;
using ltgraph.domain.Models.Graph;
using ltgraph.domain.Models.Graph.EventTypes;
using ltgraph.infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ltgraph.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "lt-graph-root")]
    public class LPath : ControllerBase
    {
        private readonly ILogger<LPath> _logger;
        private readonly ILPathRepository _lpathRepo;
        private readonly IClaimInfo claimInfo;
        public LPath(ILogger<LPath> logger, ILPathRepository lpathRepo, IClaimInfo claimInfo)
        {
            _logger = logger;
            _lpathRepo = lpathRepo;
            this.claimInfo = claimInfo;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Root()
        {
            return Ok(new
            {
                Result = "Success"
            });
        }

        [HttpGet("secured")]
        public IActionResult Secured()
        {
            return Ok(new
            {
                Result = "Secured end-point accessed"
            });
        }

        [HttpPost("eventstore")]
        [AllowAnonymous]
        public async Task<IActionResult> AcceptEventStore([FromBody] List<GraphEvent> graphEvents)
        {
            await _lpathRepo.WriteGraphEvents(graphEvents);
            return Ok();
        }
    }
}