using System.Text;
using System.Text.Json;
using lt_core_api.Utilities.Interfaces;
using lt_core_application.KeyCloakMessages;
using MassTransit.Mediator;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

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
        private readonly string userLoginQueue;
        #endregion

        private readonly ILogger<KeycloakEventConsumer> _logger;
        private readonly IMediator mediator;

        public KeycloakEventConsumer(ILogger<KeycloakEventConsumer> logger, IConfiguration configuration, IMediator mediator)
        {
            _logger = logger;
            this.mediator = mediator;
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
            userLoginQueue = QueueNameFor("user-login");

            keycloakTopicExchange = configuration.GetSection("KeycloakEvents:KC_Topic_Exchange").Value;

            this.rabbitmqConnection = this.rabbitmqConnectionFactory.CreateConnection("lt-core-api:keycloak-event-consumer");
            this.rabbitmqChannel = this.rabbitmqConnection.CreateModel();

            this.rabbitmqChannel.ExchangeDeclare(keycloakTopicExchange, ExchangeType.Topic, true, false, null);

            #region Declare Queues
            DeclareAllEventsQueue();
            DeclareUserLoginQueue();
            #endregion

            #region Attach Consumers
            AttachLoginConsumer(rabbitmqChannel);
            #endregion

            _logger.LogInformation($"[Keycloak Event Consumer Established] {rabbitmqConnection.ClientProvidedName}: {rabbitmqConnection.Endpoint.ToString()}");
        }

        public void DeclareUserLoginQueue() {
            this.rabbitmqChannel.QueueDeclare(userLoginQueue, true, false, false, null);
            this.rabbitmqChannel.QueueBind(userLoginQueue, keycloakTopicExchange, $"KK.EVENT.CLIENT.{realm}.SUCCESS.learntree-spa.LOGIN", null);
            this.rabbitmqChannel.QueueBind(userLoginQueue, keycloakTopicExchange, $"KK.EVENT.CLIENT.{realm}.SUCCESS.*.LOGOUT", null);
        }

        public void DeclareAllEventsQueue() {
            this.rabbitmqChannel.QueueDeclare(allEventQueue, true, false, false, null);
            this.rabbitmqChannel.QueueBind(allEventQueue, keycloakTopicExchange, $"KK.EVENT.*.{realm}.#", null);
        }

        #region Consumer Definitions
        public void AttachLoginConsumer(IModel channel) {
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var rawMessage = Encoding.UTF8.GetString(ea.Body.ToArray());
                _logger.LogInformation(rawMessage);
                
                var message = JsonSerializer.Deserialize<Login>(rawMessage, new JsonSerializerOptions() { PropertyNameCaseInsensitive = true, MaxDepth = 2 });
                this.mediator.Send<Login>(message!);
            };

            channel.BasicConsume(queue: allEventQueue, autoAck: true, consumer: consumer);
        }

        #endregion

        #region Utilities
        internal string QueueNameFor(string queue) {
            return $"{this.realm.ToLower()}-{queue}";
        }
        #endregion
    }
}