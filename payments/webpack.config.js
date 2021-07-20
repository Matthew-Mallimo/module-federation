const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const deps = require("./package.json").dependencies;


module.exports = {
  entry: path.join(__dirname, "src", "index.jsx"),
  output: {
    path:path.resolve(__dirname, "dist"),
    publicPath: 'http://localhost:9001/'
  },
  mode: 'development',
  devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      index: 'index.html',
      port: 9001
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
      name: 'Payments',
      filename: 'remoteEntry.js',
      exposes: {
          './Payments': './src/components/Payments.jsx',
      },
      shared: {
        react: {
          requiredVersion: deps.react,
          import: "react", // the "react" package will be used a provided and fallback module
          shareKey: "react", // under this name the shared module will be placed in the share scope
          shareScope: "default", // share scope with this name will be used
          singleton: true, // only a single version of the shared module is allowed
        },
        "react-dom": {
          requiredVersion: deps["react-dom"],
          singleton: true, // only a single version of the shared module is allowed
        },
      },
    })
  ]
}