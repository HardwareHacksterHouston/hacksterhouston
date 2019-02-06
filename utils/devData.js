const faker = require('faker');
const Redis = require('redis');

const redis = Redis.createClient({ host: 'redis-server' });

const fakeUrl = () => ({
    url: faker.internet.url(),
    name: faker.company.catchPhrase(),
    description: faker.hacker.phrase()
});

const addFake = () => new Promise(resolve => redis.rpush('links', JSON.stringify(fakeUrl()), resolve));
const delList = () => new Promise(resolve => redis.del('links', resolve));

const setFakes = async (count) => {
    await delList();

    const promises = [];
    for(var n = 1; n <= count; n++) {
	promises.push(addFake(n));
    }

    await Promise.all(promises);
};

module.exports = { setFakes };
