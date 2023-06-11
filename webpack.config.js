module.exports = {
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_DOMAIN": JSON.stringify(process.env.REACT_DOMAIN),
    }),
  ],
};
