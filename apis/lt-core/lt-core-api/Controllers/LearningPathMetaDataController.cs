using lt_core_api.Utilities.Interfaces;
using lt_core_application.DTOs;
using lt_core_infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lt_core_api.Controllers
{
    [ApiController]
    [Authorize(Roles="metadata-access")]
    [Route("api/[controller]")]
    public class LearningPathMetaDataController : ControllerBase
    {
        private readonly ILearningPathMetaDataRepository lpMetaDataRepo;
        private readonly IKeycloakAdmin keycloakAdmin;
        private readonly IClaimInfo claimInfo;
        public LearningPathMetaDataController(ILearningPathMetaDataRepository lpMetaDataRepo, IClaimInfo claimInfo, IKeycloakAdmin keycloakAdmin)
        {
            this.lpMetaDataRepo = lpMetaDataRepo;
            this.keycloakAdmin = keycloakAdmin;
            this.claimInfo = claimInfo;
        }

        [HttpPost]
        public async Task<IActionResult> AddLearningPathMetaData(LPMetadataDTO metadata)
        {
            var username = claimInfo.GetUsername();
            var users = await keycloakAdmin.GetAllUserNames();
            await lpMetaDataRepo.InsertLPMetaData(metadata);
            return Ok();
        }
    }
}