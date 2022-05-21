using lt_core_api.Utilities.Interfaces;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;

namespace lt_core_api.Utilities
{
    public class KeycloakAdmin : IKeycloakAdmin
    {
        private Task Init;
        private readonly string clientId;
        private readonly string clientSecret;
        private readonly string tokenEndpoint;
        private readonly IHttpClientFactory? _httpClientFactory;
        
        public KeycloakAdmin(IConfiguration configuration, IHttpClientFactory? httpClientFactory)
        {
            clientId = configuration.GetSection("LTCoreAPI:ClientId").Value;
            clientSecret = configuration.GetSection("LTCoreAPI:ClientSecret").Value;
            tokenEndpoint = configuration.GetSection("LTCoreAPI:TokenEndpoint").Value;
            _httpClientFactory = httpClientFactory;

            Init = Authenticate();
        }

        public async Task Authenticate()
        {
            var httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, tokenEndpoint)
            {
                Headers =
                {
                    { HeaderNames.Accept, "*/*" },
                    { HeaderNames.ContentType, "application/x-www-form-urlencoded" },
                    { HeaderNames.Authorization, $"Basic {Base64Encode($"{clientId}:{clientSecret}")}" }
                },
                Content = new FormUrlEncodedContent(new List<KeyValuePair<string, string>>(){ new KeyValuePair<string, string>("grant_type", "client_credentials") })
            };

            using var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                var content = await httpResponseMessage.Content.ReadAsStringAsync();
                var parsed = JObject.Parse(content);
            }
        }

        internal string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public void Foo()
        {
            Console.WriteLine("Foo");
        }
    }
}