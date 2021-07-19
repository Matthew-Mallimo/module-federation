const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path:path.resolve(__dirname, "dist"),
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    index: 'index.html',
    port: 9002
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
      name: 'Dashboard',
      remotes: {
          Payments: 'Payments@http://localhost:9001/remoteEntry.js',
          Transactions: 'Transactions@http://localhost:9003/remoteEntry.js'
      },
      shared: ['react','react-dom']
    })
  ]
}