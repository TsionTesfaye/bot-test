const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
   publicPath: '/',
  transpileDependencies: [], // Specify dependencies to transpile or set to false

  
  devServer: {
    //https: true,
     allowedHosts: [
      '.ngrok.io',
        'localhost',
        '89cf-196-188-35-226.ngrok-free.app'
      ],
       client: {
        webSocketURL: 'auto://0.0.0.0:0/ws'
   }
      
    
  },

  chainWebpack: (config) => {
    config.module
      .rule('pdf') // Create a rule called 'pdf' for handling PDF files
      .test(/\.pdf$/) // Test for files with the .pdf extension
      .use('file-loader') // Use the file-loader to handle these files
      .loader('file-loader');
  },
});
