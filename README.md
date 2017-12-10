# Webpack Lifecycle Plugin
A Lifecycle plugin for webpack

## Installation

```shell
npm install webpack-lifecycle-plugin --save-dev
```

## Usage

```js
module.exports = {
  ...
  plugins:[
    new LifecyclePlugin({"done": (compilation, options, pluginOptions) => {
      console.log(compilation.compilation.records.chunks)
    }}),
  ]
}
```
## Note
This plugin currently supports all the documented webpack hooks.
Not all hooks have been tested. Add an issue (with reproducable code) to the repo if problem occur.

To read more about Hooks look at the [webpack documentation](https://webpack.js.org/api/compiler/#event-hooks)
