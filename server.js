const crypto = require('crypto');
const Redis = require('redis');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

const redis = Redis.createClient({ host: 'redis-server' });
const numLinks = () => new Promise(resolve => redis.llen('links', (err, num) => resolve(num)));
const getLinks = (max) => new Promise(async (resolve) => {
    const max = await numLinks();
    redis.lrange('links', 0, max, (err, links) => {
	resolve(_.map(links, JSON.parse));
    });
});
const getUser = (username) => new Promise(resolve => redis.get(`admin:${username}`, (err, json) => resolve(JSON.parse(json))));

app.use('/', express.static('/app/public', { setHeaders: (res, path) => {
    if(path.endsWith('.css')) { res.setHeader('Content-Type', 'text/css'); }
} }));

app.use(session({
    store: new RedisStore({ host: 'redis-server' }),
    secret: 'blah',
    resave: false
}));

app.use(bodyParser.json());

app.use(/\/log.*|\/links/, (req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/links', async (request, response) => {
    if (request.session.views) request.session.views++;
    else request.session.views = 1;
    const links = await getLinks();

    response.send(JSON.stringify(links));
});

app.get('/loginStatus', (request, response) => {
    response.send(JSON.stringify({
        loggedIn: request.session.loggedIn,
        currentUser: request.session.currentUser
    }));
});

app.post('/logout', (request, response) => {
    request.session.currentUser = null;
    request.session.loggedIn = false;
    response.status(200).send('logged out');
});

app.post('/login', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const user = await getUser(username);
    const hasher = crypto.createHash('sha256');
    hasher.update(`${password}${user && user.salt}`);
    const hash = hasher.digest('hex');

    if (!user || !user.hash || !user.salt || hash != user.hash) {
        request.session.currentUser = null;
        request.session.loggedIn = false;
        response.status(401).send('Unable to authenticate');
    } else {
        request.session.currentUser = username;
        request.session.loggedIn = true;
        response.status(200).send(username);
    }
});

process.on('SIGTERM', () => app.close(() => process.exit(0)));

app.listen(3000);
