from ubuntu
run apt-get update
run apt-get install -y nodejs
run apt-get install -y npm
run mkdir node
workdir node
copy package.json package.json
run npm install --no-optional
env NODE_PATH /node/node_modules
cmd ["node", "/src/app.js"]