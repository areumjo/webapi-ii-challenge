const express = require('express');

const PostRouter = require('./data/post-router');

const server = express();

server.use(express.json());
server.use('/api/post', PostRouter);

// http://localhost:4000/
server.get('/', (req, res) => {
    res.send(`
        <h2>Node API II - challenge</h2>
        <p>Testing</p>
    `);
});

module.exports = server;