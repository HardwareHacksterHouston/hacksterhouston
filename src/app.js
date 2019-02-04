const redis = require('redis');
const express = require('express');
const app = express();

app.get('/', (request, response) => {
    const client = redis.createClient({ host: 'redis-server' });

    client.keys('*', (err, keys) => {
	let str = '';
	str += '<ul>';
	keys.forEach((key) => (str += `<li>${key}</li>`));
	str += '</ul>';
	response.send(str);
    });

});

process.on('SIGTERM', () => app.close(() => process.exit(0)));

app.listen(3000);
