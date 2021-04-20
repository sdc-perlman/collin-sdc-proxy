const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.resolve(__dirname, './server/index.js'),
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],

  output: {
      path: path.resolve(__dirname, './server'),
      filename: 'server.bundle.js',
  },

  resolve: {
      extensions: ['.js', '.jsx'],
  },

  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: 'babel-loader',
          },
      ],
  },
  plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "false"
      }),
    ]
};