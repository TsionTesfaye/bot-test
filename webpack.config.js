// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Output file name and extension
            },
          },
        ],
      },
    ],
  },
  devServer: {
   compress: true,
    port: 3000,

    // 👇️ set this property
    disableHostCheck: true
}
};
