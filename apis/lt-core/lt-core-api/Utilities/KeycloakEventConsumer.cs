using lt_core_api.Utilities.Interfaces;
using RabbitMQ.Client;

namespace lt_core_api.Utilities
{
    public class KeycloakEventConsumer : IKeycloakEventConsumer
    {
        private readonly ConnectionFactory rabbitmqConnectionFactory;
        private readonly IConnection rabbitmqConnection;
        private readonly IModel rabbitmqChannel;

        private readonly ILogger<KeycloakEventConsumer> _logger;

        public KeycloakEventConsumer(ILogger<KeycloakEventConsumer> logger)
        {
            _logger = logger;

            this.rabbitmqConnectionFactory = new ConnectionFactory()
            {
                HostName = "localhost", 
                Port = 5673, 
                VirtualHost = "/",
                UserName = "guest",
                Password = "guest"
            };

            this.rabbitmqConnection = this.rabbitmqConnectionFactory.CreateConnection("lt-core-api:keycloak-event-consumer");
            this.rabbitmqChannel = this.rabbitmqConnection.CreateModel();

            this.rabbitmqChannel.ExchangeDeclare("keycloak-topic-exchange", ExchangeType.Topic, true, false, null);
            _logger.LogInformation($"Keycloak Event Consumer Established: {rabbitmqConnection.Endpoint.ToString()}");
        }
    }
}