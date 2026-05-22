const net = require('node:net');

const client = net.createConnection({ port : 3001, host : 'localhost'},() => {
    console.log("Connected to the server");
});

client.on('data', (data) => {
    console.log(data.toString());
});

process.stdin.on('data', (data) => {
    client.write(data);
});

client.on('end', () => {
    console.log("Connection closed by server");
});

client.on('error', (err) => {
    console.log(err);
});