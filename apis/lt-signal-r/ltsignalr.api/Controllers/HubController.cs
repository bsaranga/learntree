using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ltsignalr.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HubController : ControllerBase
    {
        private readonly IHubContext<LTHub> context;

        public HubController(IHubContext<LTHub> context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Broadcast()
        {
            await this.context.Clients.All.SendAsync("AcceptMessage", "MessageFROM: Controller");
            return Ok();
        }
    }
}