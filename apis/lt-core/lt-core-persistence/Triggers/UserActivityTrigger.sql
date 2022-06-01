CREATE FUNCTION publish_message() RETURNS trigger AS $publish_message$
    BEGIN
        PERFORM amqp.publish(1, '', 'postgres_ampq', FORMAT('{userId: "%s", sessionId: "%s"}', NEW."KcUserId", NEW."LastActiveSessionId"));
        RETURN NULL;
    END;
$publish_message$ LANGUAGE plpgsql;

CREATE TRIGGER NewUserLogin
  AFTER INSERT
  ON public."UserActivity"
  FOR EACH ROW
  EXECUTE PROCEDURE publish_message();