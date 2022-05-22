using System.Security.Claims;
using lt_core_api.Utilities.Interfaces;

namespace lt_core_api.Utilities
{
    public class ClaimInfo : IClaimInfo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClaimInfo(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetUsername()
        {
            var username = _httpContextAccessor?.HttpContext?.User.Claims.Single(c => c.Type == "name").Value;
            return username;
        }
    }
}