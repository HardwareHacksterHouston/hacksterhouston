const postJson = async (path, obj) => {
    const response = await fetch(path, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    });
    const text = await response.text();

    if (response.ok) {
        return text;
    } else {
        throw text;
    }
};

const getJson = async (path) => {
    const response = await fetch(path);
    return response.json();
};

export { postJson, getJson };
