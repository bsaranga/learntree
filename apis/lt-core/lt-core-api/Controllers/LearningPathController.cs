using lt_core_application.DTOs;
using lt_core_infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace lt_core_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearningPathController : ControllerBase
    {
        private readonly ILearningPathRepository learningPathRepository;
        public LearningPathController(ILearningPathRepository learningPathRepository)
        {
            this.learningPathRepository = learningPathRepository;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLearningPath(LPDto learningPath)
        {
            await learningPathRepository.InsertLearningPath(learningPath);
            return Ok();
        }
    }
}