# Use the official RabbitMQ image with management plugin enabled as the base image
FROM rabbitmq:3-management

# Set environment variables for the default RabbitMQ user
ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

# Expose the ports for AMQP and RabbitMQ Management
EXPOSE 5672
EXPOSE 15672

# Start RabbitMQ server
CMD ["rabbitmq-server"]
