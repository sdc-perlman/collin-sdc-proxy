const path = require('path');
const webpack = require('webpack');
const S3Plugin = require('webpack-s3-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'nearby.js',
      publicPath: '/'
    },
    module: {
      rules: [
        { test: /\.js$|jsx/, use: 'babel-loader' },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    plugins: [
      new webpack.DefinePlugin({
        __isBrowser__: "true"
      }),
      new CompressionPlugin(),
      new CleanWebpackPlugin(),
      new S3Plugin({
        s3Options: {
          exclude: /.*\.(html|txt)/,
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          region: 'us-east-2',
        },
        s3UploadOptions: {
          Bucket: 'nearby-bundles',
        },
      }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};
