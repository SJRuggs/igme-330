const path = require('path');
const glob = require('glob');

module.exports = {
    mode: 'production',
    entry: glob.sync('./src/**/*.js'),
    output: {
        filename: './bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        preferRelative: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    }	  
};