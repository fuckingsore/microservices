const kafka = require("kafka-node");

const client = new kafka.KafkaClient({kafkaHost: "10.105.95.199:9092"});
const consumer = new kafka.Consumer(
    client,
    [
        {
            topic: "test",
            partition: 0,
            offset: 0
        }
    ],
    {
        fromOffset: true
    }
);

consumer.on("message", message => {
    const topic = message.topic;
    const value = message.value;
    console.log("Message topic: " + topic);
    console.log("Message value: " + value);
    console.log("----------------------------------------");
});
