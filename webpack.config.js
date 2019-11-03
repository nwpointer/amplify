const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  let config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config = {
    ...config,
    module: {
      ...config.module,
      rules:[
        ...config.module.rules,
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        }
      ]
    },
    resolve: {
      ...config.resolve,
      extensions: [
        ...config.resolve.extensions,
        ".webpack.js", ".web.js", ".mjs", ".js", ".json"
      ]
    }
  }
  return config;
};
