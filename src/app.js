const Redis = require('redis');
const _ = require('lodash');
const express = require('express');

const app = express();

const redis = Redis.createClient({ host: 'redis-server' });
const numLinks = () => new Promise(resolve => redis.llen('links', (err, num) => resolve(num)));
const getLinks = (max) => new Promise(async (resolve) => {
    const max = await numLinks();
    redis.lrange('links', 0, max, (err, links) => {
	resolve(_.map(links, JSON.parse));
    });
});

app.get('/links', async (request, response) => {
    const links = await getLinks();

    response.send(JSON.stringify(links));
});

app.get('/', (request, response) => {
    const client = Redis.createClient({ host: 'redis-server' });

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
