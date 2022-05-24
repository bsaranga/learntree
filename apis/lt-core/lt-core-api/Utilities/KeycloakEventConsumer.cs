using lt_core_api.Utilities.Interfaces;
using RabbitMQ.Client;

namespace lt_core_api.Utilities
{
    public class KeycloakEventConsumer : IKeycloakEventConsumer
    {
        private readonly ConnectionFactory rabbitmqConnectionFactory;
        private readonly IConnection rabbitmqConnection;
        private readonly IModel rabbitmqChannel;
        private readonly string keycloakTopicExchange = "";

        private readonly ILogger<KeycloakEventConsumer> _logger;

        public KeycloakEventConsumer(ILogger<KeycloakEventConsumer> logger, IConfiguration configuration)
        {
            _logger = logger;

            this.rabbitmqConnectionFactory = new ConnectionFactory()
            {
                HostName = configuration.GetSection("RabbitMQ:Host").Value, 
                Port = Int32.Parse(configuration.GetSection("RabbitMQ:Port").Value), 
                VirtualHost = configuration.GetSection("RabbitMQ:VirtualHost").Value,
                UserName = configuration.GetSection("RabbitMQ:User").Value,
                Password = configuration.GetSection("RabbitMQ:Password").Value
            };

            keycloakTopicExchange = configuration.GetSection("KeycloakEvents:KC_Topic_Exchange").Value;

            this.rabbitmqConnection = this.rabbitmqConnectionFactory.CreateConnection("lt-core-api:keycloak-event-consumer");
            this.rabbitmqChannel = this.rabbitmqConnection.CreateModel();

            this.rabbitmqChannel.ExchangeDeclare(keycloakTopicExchange, ExchangeType.Topic, true, false, null);
            this.rabbitmqChannel.QueueDeclare("learntree-all-events", true, false, false, null);
            this.rabbitmqChannel.QueueBind("learntree-all-events", keycloakTopicExchange, "KK.EVENT.*.LearnTree.#", null);

            _logger.LogInformation($"[Keycloak Event Consumer Established] {rabbitmqConnection.ClientProvidedName}: {rabbitmqConnection.Endpoint.ToString()}");
            _logger.LogInformation($"GOT TOPIC EXCHANGE FROM CONFIG: {keycloakTopicExchange}");
        }

        public void DeclareUserRegistrationQueue() {

        }
    }
}