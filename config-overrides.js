const webpack = require('webpack');

module.exports = function override(config, env) {
  config.resolve.fallback = {
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "crypto": require.resolve("crypto-browserify"),
  };
  return config;
};
