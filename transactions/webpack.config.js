const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path:path.resolve(__dirname, "dist"),
    publicPath: 'http://localhost:9003/'
  },
  mode: 'development',
  devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      index: 'index.html',
      port: 9003
  },
  optimization: {
    splitChunks: {
        chunks: 'all',
        minSize: 10000,
        automaticNameDelimiter: '_'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
    }),
    new ModuleFederationPlugin({
      name: 'Transactions',
      filename: 'remoteEntry.js',
      exposes: {
          './Transactions': './src/components/Transactions.jsx',
      },
      shared: ['react','react-dom']
  })
  ]
}