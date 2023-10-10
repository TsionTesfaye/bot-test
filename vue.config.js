const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [], // Specify dependencies to transpile or set to false

  configureWebpack: {
    devServer: {
      // Uncomment and configure devServer options as needed
      // allowedHosts: ['*.ngrok.io'],
      // https: true,
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('pdf') // Create a rule called 'pdf' for handling PDF files
      .test(/\.pdf$/) // Test for files with the .pdf extension
      .use('file-loader') // Use the file-loader to handle these files
      .loader('file-loader');
  },
});
