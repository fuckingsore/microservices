const express = require("express");
const kafka = require("kafka-node");

const app = express();
const client = new kafka.KafkaClient({kafkaHost: "10.105.95.199:9092"});
const producer = new kafka.Producer(client);

app.use(express.json());

app.get("/", (request, response) => {
    const message = JSON.stringify(request.body.message);

    producer.send([{
        topic: "test",
        messages: [message]
    }]);

    response.send({
        value: "Your response",
        request: request.body
    });
});

const server = app.listen(8080);
