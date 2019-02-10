const faker = require('faker');
const RedisWrapper = require('../redisWrapper');

const fakeUrl = (id) => ({
    url: faker.internet.url(),
    name: faker.company.catchPhrase(),
    description: faker.hacker.phrase(),
    id
});

const addFake = (id) => RedisWrapper.saveLink(fakeUrl(id));
const delList = async () => {
    const keys = await RedisWrapper.keys('link:*');
    if (keys.length > 0) {
        return redisWrapper.del(keys);
    }
}

const setFakes = async (count) => {
    await delList();

    const promises = [];
    for(var n = 1; n <= count; n++) {
	promises.push(addFake(n));
    }

    await Promise.all(promises);
};


const addSorts = async () => {
    const links = await RedisWrapper.getLinks();
    let sort = 0;
    links.forEach(async (link) => {
        link.sortOrder = ++sort;
        await RedisWrapper.saveLink(link);
    });
};

module.exports = { setFakes, addSorts };
