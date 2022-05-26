using System.Text.Json;
using lt_core_api.Utilities.Interfaces;
using lt_core_application.Interfaces;
using lt_core_application.KeyCloakModels;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;

namespace lt_core_api.Utilities
{
    public class KeycloakAdmin : IKeycloakAdmin, IKeycloakAdminInit
    {
        private PeriodicTimer? _timer;
        private int? expiry;
        private string? accessToken;
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly string tokenEndpoint;
        private readonly string keyCloakRestApiRoot;
        private readonly ILogger<KeycloakAdmin> _logger;
        private readonly IHttpClientFactory? _httpClientFactory;
        private JObject? parsedData;
        
        public KeycloakAdmin(IConfiguration configuration, IHttpClientFactory? httpClientFactory, ILogger<KeycloakAdmin> logger)
        {
            _logger = logger;
            _httpClientFactory = httpClientFactory;

            clientId = configuration.GetSection("LTCoreAPI:ClientId").Value;
            clientSecret = configuration.GetSection("LTCoreAPI:ClientSecret").Value;
            tokenEndpoint = configuration.GetSection("LTCoreAPI:TokenEndpoint").Value;
            keyCloakRestApiRoot = configuration.GetSection("LTCoreAPI:KeyCloakRESTAPIRoot").Value;
        }
        #region Initialization Code <Do Not Call Manually OR Modify>
        public async Task Authenticate()
        {
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, tokenEndpoint)
            {
                Headers =
                {
                    { HeaderNames.Accept, "*/*" },
                    { HeaderNames.Authorization, $"Basic {Base64Encode($"{clientId}:{clientSecret}")}" }
                },
                Content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>(){ new KeyValuePair<string, string>("grant_type", "client_credentials") })
            };

            using var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var content = await httpResponseMessage.Content.ReadAsStringAsync();
                parsedData = JObject.Parse(content);
                accessToken = (string)parsedData["access_token"]!;
                expiry = (int)parsedData?["expires_in"]!;
                
                _timer = new PeriodicTimer(TimeSpan.FromSeconds((double)expiry));
                _logger.LogInformation("Authenticated with Keycloak REST API.");
            } else {
                _logger.LogCritical("Keycloak REST API Authentication failed.");
            }
        }

        public async Task ScheduledUpdate() {
            do
            {
                await Authenticate();
            } while (await _timer!.WaitForNextTickAsync());
        }

        internal string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        #endregion

        public async Task<List<string>> GetAllUserNames()
        {
            var users = new List<string>();
            var getUsersRequest = new HttpRequestMessage(HttpMethod.Get, $"{keyCloakRestApiRoot}/users")
            {
                Headers = 
                {
                    { HeaderNames.Accept, "*/*" }, 
                    {HeaderNames.Authorization, $"Bearer {accessToken}"}
                }
            };

            using var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(getUsersRequest);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var data = await httpResponseMessage.Content.ReadAsStringAsync();
                var parsedData = JArray.Parse(data);
                foreach (var u in parsedData)
                {
                    users.Add((string) u["username"]!);
                }
            }

            return users;
        }

        public async Task<User?> GetUserById(string guid)
        {
            var getUserRequest = new HttpRequestMessage(HttpMethod.Get, $"{keyCloakRestApiRoot}/users/{guid}")
            {
                Headers = 
                {
                    { HeaderNames.Accept, "*/*" },
                    { HeaderNames.Authorization, $"Bearer {accessToken}" }
                }
            };
            
            using var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(getUserRequest);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var data = await httpResponseMessage.Content.ReadAsStringAsync();
                var userData = JsonSerializer.Deserialize<User>(data, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true });
                return userData;
            }

            return new User();
        }
    }
}