var path = require('path'),
    webpack = require('webpack')

module.exports = {
    entry: {
        app: path.join(__dirname, 'app.js')
    },
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['jsx-loader?harmony', 'babel-loader']}
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            mangle: {}
        })
    ]
}
