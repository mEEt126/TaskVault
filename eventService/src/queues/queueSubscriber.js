const amqp = require('amqplib');
const { Event } = require('../models');
const sendEmail = require('../mail/mailService');

const listenForMessages = async () => {
  try{  
    const connection = await amqp.connect('amqp://localhost');  // defalut is 5672 
    const channel = await connection.createChannel();
    const queue = 'task_event_queue';

    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
        const event = JSON.parse(msg.content.toString());

        await Event.create({
            userId: event.userId,
            taskId: event.taskId,
            eventType: event.eventType
        });
            // sync between event database entry and then send mail 
        await sendEmail(event);

        channel.ack(msg);
        }
    });
    }
    catch(error)
    {
        console.error(error.message)
    }
}

module.exports = { listenForMessages };
