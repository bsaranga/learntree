using ltgraph.domain.Interfaces;

namespace ltgraph.Utilities
{
    public class ClaimInfo : IClaimInfo
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ClaimInfo(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetUserId()
        { 
            var username = _httpContextAccessor?.HttpContext?.User.Claims.Single(c => c.Type == "UserId").Value;
            return username;
        }
    }
}