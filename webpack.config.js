module.exports = {
    mode: 'none',
    entry: './jsx/app.jsx',
    output: {
        path: __dirname + '/public/js',
        filename: 'app.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.jsx$/, loader: 'babel-loader' }
        ]
    }
};
