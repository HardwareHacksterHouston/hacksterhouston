const Redis = require('redis');
const _ = require('lodash');

const redis = Redis.createClient({ host: 'redis-server' });
const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
    const callback = (err, result) => {
        if (err) { reject(err); }
        else { resolve(result); }
    }
    redis[fn].apply(redis, args.concat([callback]));
});

const methods = { redis };
_.map(['get', 'mget', 'keys', 'set', 'del'], key => (methods[key] = promisify(key)));

methods.numLinks = async () => (await methods.keys('link:*')).length;

methods.getLinks = async () => {
    const keys = await methods.keys('link:*');
    if (keys.length === 0) { return []; }
    else { return _.map(await methods.mget(keys), JSON.parse); }
};

methods.getLink = (id) => methods.get(`link:${id}`).then(JSON.parse);

methods.getUser = (username) => methods.get(`admin:${username}`).then(JSON.parse);

methods.saveLink = (link) => methods.set(`link:${link.id}`, JSON.stringify(link));

methods.deleteLink = (id) => methods.del(`link:${id}`);

methods.nextSortOrder = async () => {
    const links = await methods.getLinks();
    return Math.max.apply(null, _.map(links, ln => ln.sortOrder)) + 1;
};

methods.updateSortOrder = async (id, newSortOrder) => {
    const link = await methods.getLink(id);
    link.sortOrder = newSortOrder;
    return methods.saveLink(link);
};

module.exports = methods;
