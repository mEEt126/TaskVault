const amqp = require('amqplib');

let channel;

const connectQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672'); //defalut port is 5672
    channel = await connection.createChannel();
    await channel.assertQueue('task_event_queue', { durable: true });
  } catch (error) {
    console.error(`Error connecting to RabbitMQ: ${error.message}`);
  }
};

const publishMessage = async (message) => {
  if (!channel) {
    await connectQueue();
  }

  try {
    channel.sendToQueue('task_event_queue', Buffer.from(JSON.stringify(message)), { persistent: true });
    console.log(`Message sent to queue: ${JSON.stringify(message)}`);
  } catch (error) {
    console.error(`Error publishing message: ${error.message}`);
  }
};

module.exports = { connectQueue, publishMessage };
