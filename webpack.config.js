const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");

const css = {
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'postcss-loader'
        }
    ]
};

const stylus = {
    test: /\.styl$/,
    use: [
        {
            loader: 'style-loader'
        }, {
            loader: 'css-loader'
        }, {
            loader: 'postcss-loader'
        }, {
            loader: 'stylus-loader'
        }
    ]
};

const html = {
    test: /\.html$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].html'
            }
        }, {
            loader: 'extract-loader'
        }, {
            loader: 'html-loader',
            options: {
                attrs: ["img:src"]
            }
        }
    ]
};

const pug = {
    test: /\.pug$/,
    use: {
        loader: 'pug-loader'
    }
};

const files = {
    test: /\.jpg|gif|png|svg|bmp$/,
    use: {
        loader: 'file-loader',
        options: {
            name: 'img/[name].[ext]'
        }
    }
};

const js = {
    test: /\.js$/,
    use: {
        loader: 'babel-loader'
    },
    exclude: /node_modules/
};

module.exports = {
    module: {
        rules: [
            css,
            stylus,
            html,
            pug,
            files,
            js
        ]
    },
    plugins: [new htmlwebpackplugin({template: './pug/layout.pug', title: 'Webpack 4 boilerplate'})],
    entry: {
        main: "./src"
        // relative to where webpack is run from - path on cmd, possibility to merge
        // multiple files - [ex1.js, ex2.js, ex10.js]
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    devServer: {
        contentBase: 'dist',
        port: 8080,
        overlay: true
    }
};