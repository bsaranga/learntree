using lt_core_persistence.Queries.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lt_core_api.Controllers
{
    [ApiController]
    [Authorize(Roles="metadata-access")]
    [Route("api/[controller]")]
    public class LookupController : ControllerBase
    {
        private readonly ILookupQuery lookupQuery;

        public LookupController(ILookupQuery lookupQuery)
        {
            this.lookupQuery = lookupQuery;
        }

        [HttpGet("topics")]
        public IActionResult GetAllTopics()
        {
            try
            {
                return Ok(this.lookupQuery.GetAllTopics());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}