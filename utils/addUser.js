const crypto = require('crypto');
const argv = require('yargs').argv;
const Redis = require('redis');

const redis = Redis.createClient({ host: 'redis-server' });

const makeSalt = () => crypto.randomBytes(10).toString('hex');

const makeHash = (password, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(`${password}${salt}`);
    return hash.digest('hex');
}

const storeUser = (username, hash, salt) => new Promise(resolve => redis.set(`admin:${username}`, JSON.stringify({ hash, salt }), resolve));

const makeUser = (username, password) => {
    const salt = makeSalt();
    const hash = makeHash(password, salt);
    return storeUser(username, hash, salt);
}

if (!argv.user || !argv.password) {
    console.error('--user and --password are required');
    process.exit(1);
} else if (!argv.user.match(/[a-zA-Z0-9_\-]+/)) {
    console.error('Usernames have to look like usernames');
    process.exit(1);
} else {
    makeUser(argv.user, argv.password).then(() => {
        console.log(`User ${argv.user} created`);
        process.exit(0);
    });
}
