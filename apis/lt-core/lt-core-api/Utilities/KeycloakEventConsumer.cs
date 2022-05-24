using lt_core_api.Utilities.Interfaces;
using RabbitMQ.Client;

namespace lt_core_api.Utilities
{
    public class KeycloakEventConsumer : IKeycloakEventConsumer
    {
        private readonly ConnectionFactory rabbitmqConnectionFactory;
        private readonly IConnection rabbitmqConnection;
        private readonly IModel rabbitmqChannel;
        private readonly string keycloakTopicExchange;
        private readonly string realm;

        #region Queues
        private readonly string allEventQueue;
        private readonly string userRegistrationQueue;
        #endregion

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

            realm = configuration.GetSection("KeycloakEvents:Realm").Value;
            allEventQueue = QueueNameFor("all-events");
            userRegistrationQueue = QueueNameFor("user-reg");

            keycloakTopicExchange = configuration.GetSection("KeycloakEvents:KC_Topic_Exchange").Value;

            this.rabbitmqConnection = this.rabbitmqConnectionFactory.CreateConnection("lt-core-api:keycloak-event-consumer");
            this.rabbitmqChannel = this.rabbitmqConnection.CreateModel();

            this.rabbitmqChannel.ExchangeDeclare(keycloakTopicExchange, ExchangeType.Topic, true, false, null);

            #region DeclareQueues
            DeclareAllEventsQueue();
            DeclareUserRegistrationQueue();
            #endregion

            _logger.LogInformation($"[Keycloak Event Consumer Established] {rabbitmqConnection.ClientProvidedName}: {rabbitmqConnection.Endpoint.ToString()}");
        }

        public void DeclareUserRegistrationQueue() {
            this.rabbitmqChannel.QueueDeclare(userRegistrationQueue, true, false, false, null);
            this.rabbitmqChannel.QueueBind(userRegistrationQueue, keycloakTopicExchange, $"KK.EVENT.*.{realm}.*.*.REGISTER", null);
        }

        public void DeclareAllEventsQueue() {
            this.rabbitmqChannel.QueueDeclare(allEventQueue, true, false, false, null);
            this.rabbitmqChannel.QueueBind(allEventQueue, keycloakTopicExchange, $"KK.EVENT.*.{realm}.#", null);
        }

        #region Utilities
        internal string QueueNameFor(string queue) {
            return $"{this.realm.ToLower()}-{queue}";
        }
        #endregion
    }
}