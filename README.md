# React Module Federation Example

This is an example of how module-federation can be achieved with React components.

## Overview

We have three packages, `Payments`, `Transactions`, and `Dashboard`. 
`Payments` and `Transactions` are react components that have specific functionality.
`Dashboard` is a react component that composes `Payments` and `Transactions` into a single app.
This is accomplished through module federation, a feature available in Webpack v5.

## Key Points

### Webpack Configuration

Each module has their own webpack configuration with the Module Federation plugin added.
For `Payments` and `Transactions`, their configuration looks something like this

```javascript
    new ModuleFederationPlugin({
      name: 'Payments',
      filename: 'remoteEntry.js',
      // This tells webpack which component to expose 
      exposes: {
          './Payments': './src/components/Payments.jsx',
      },
      // This tells webpack that we want this module to share the react and react-dom instance with another federated module.
      // This is very important in order to avoid runtime errors and larger bundle sizes.
      shared: ['react','react-dom']
    })
```
### Entry Point

You will notice that in each module, the typical entry point in `index.jsx` looks a bit different. Instead of directly calling `ReactDOM.render`, we import that functionality from a seperate file, `bootstrap.jsx`. 
This is because Webpack will immediately go to that entry point to start rendering, but we dont want that. We want webpack's runtime to wait until its resolved any shared dependencies ( react, reactDom ), before we allow rendering. By putting the entry point logic into the `bootstrap.jsx` file and importing it, it creates a promise that gives webpack time to resolve these shared dependencies.

## How to run locally

First, make sure to `npm install` each package.
Then, open 3 terminals ( one for each package ) and run `npm run dev`. This will start up the webpack dev server.

Go to http://localhost:9002 to see the Dashboard module which includes `Payments` and `Transactions`.

To see just `Payments` running alone, go to http://localhost:9001
To see just `Transactions` running alone, go to http://localhost:9003

## Dynamic Loading

Check out the `DynamicLoading` branch to see how to load modules dynamically.


## Resources Used
1. https://www.youtube.com/watch?v=2eGXIbc6lZA
2. https://scriptedalchemy.medium.com/webpack-5-module-federation-stitching-two-simple-bundles-together-fe4e6a069716
3. https://webpack.js.org/concepts/module-federation/