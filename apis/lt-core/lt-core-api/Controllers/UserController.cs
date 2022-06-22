using lt_core_application.DTOs;
using lt_core_persistence.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lt_core_api.Controllers
{
    [ApiController]
    [Authorize(Roles="metadata-access")]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepository;

        public UserController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        [HttpPost("usertopic")]
        public async Task<IActionResult> AddUserTopics(IEnumerable<UserTopicDTO> userTopicDTOs)
        {
            try
            {
                await userRepository.AssociateUserTopics(userTopicDTOs);
                return Ok("Done");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}