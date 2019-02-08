const crypto = require('crypto');
const RedisWrapper = require('./redisWrapper');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const app = express();

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
    const links = await RedisWrapper.getLinks();

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

    const user = await RedisWrapper.getUser(username);
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

app.post('/link', async (request, response) => {
    if (request.session.loggedIn) {
        const newLink = request.body;
        const oldLink = await RedisWrapper.getLink(newLink.id);

        if (oldLink) {
            RedisWrapper.saveLink(newLink);
            response.status(200).send(newLink);
        } else {
            response.status(404).send(`Couldn't find link ${newLink.id}`);
        }
    } else {
        response.status(401).send('Not logged in');
    }

});

app.post('/delete/:id', async (request, response) => {
    if (request.session.loggedIn) {
        const oldLink = await RedisWrapper.getLink(request.params.id);

        if (oldLink) {
            RedisWrapper.deleteLink(oldLink.id);
            response.status(200).send('Deleted');
        } else {
            response.status(404).send(`Couldn't find link ${newLink.id}`);
        }
    } else {
        response.status(401).send('Not logged in');
    }
});

app.post('/create', async (req, res) => {
    if (req.session.loggedIn) {
        const newLink = req.body;
        const links = await RedisWrapper.getLinks();
        if (links.length > 0) {
            newLink.id = Math.max.apply(null, _.map(links, ln => ln.id)) + 1;
        } else {
            newLink.id = 1;
        }
        await RedisWrapper.saveLink(newLink);
        res.status(200).send(JSON.stringify(newLink));
    } else {
        res.status(401).send('Not logged in');
    }
});

process.on('SIGTERM', () => app.close(() => process.exit(0)));

app.listen(3000);
