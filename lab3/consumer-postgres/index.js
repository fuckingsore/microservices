const kafka = require('kafka-node');
const postgres = require('pg');

const postgresClient = new postgres.Client({
  user: 'postgres',
  host: '10.98.199.49', // should be replaced on each K8s startup
  database: 'postgres',
  password: 'postgres',
  port: '5432'
});

postgresClient.connect();

postgresClient.query(`CREATE TABLE IF NOT EXISTS messages (
  topic varchar(45) NOT NULL,
  value varchar(100) NOT NULL
)`, (error, result) => {
  console.log({ error, result });
});

const kafkaClient = new kafka.KafkaClient({
  kafkaHost: '10.105.95.199:9092'
}); // should be replaced on each K8s startup

const consumer = new kafka.Consumer(
  kafkaClient,
  [
    {
      topic: 'test',
      partition: 0,
      offset: 0
    }
  ],
  {
    fromOffset: true
  }
);

consumer.on('message', message => {
  const topic = message.topic;
  const value = message.value;
  
  const query = {
    text: 'INSERT INTO messages(topic, value) VALUES($1, $2)',
    values: [topic, value]
  };


  postgresClient.query(query, (error, result) => {
    console.log({ error, result });
  });
});
