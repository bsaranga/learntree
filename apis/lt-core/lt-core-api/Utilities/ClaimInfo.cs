using System.Security.Claims;
using lt_core_api.Utilities.Interfaces;

namespace lt_core_api.Utilities
{
    public class ClaimInfo : IClaimInfo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IKeycloakAdmin _kcAdmin;

        public ClaimInfo(IHttpContextAccessor httpContextAccessor, IKeycloakAdmin kcAdmin)
        {
            _httpContextAccessor = httpContextAccessor;
            _kcAdmin = kcAdmin;
        }

        public async Task<string?> GetUsername()
        {
            var username = _httpContextAccessor?.HttpContext?.User.Claims.Single(c => c.Type == "name").Value;
            await _kcAdmin.Authenticate();
            return username;
        }
    }
}