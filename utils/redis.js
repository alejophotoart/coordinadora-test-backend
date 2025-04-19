// utils/redisClient.js
const { createClient } = require('redis');

const redisClient = createClient({
    // url: 'redis://localhost:6379'
});

redisClient.on('error', (err) =>
    console.error('Redis error:', err)
);

redisClient.connect();

module.exports = redisClient;