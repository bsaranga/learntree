using lt_core_application.DTOs;
using lt_core_infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace lt_core_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LearningPathMetaDataController : ControllerBase
    {
        private readonly ILearningPathMetaDataRepository lpMetaDataRepo;
        public LearningPathMetaDataController(ILearningPathMetaDataRepository lpMetaDataRepo)
        {
            this.lpMetaDataRepo = lpMetaDataRepo;
        }

        [HttpPost]
        public async Task<IActionResult> AddLearningPathMetaData(LPMetadataDTO metadata)
        {
            await lpMetaDataRepo.InsertLPMetaData(metadata);
            return Ok();
        }
    }
}