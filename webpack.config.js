module.exports = {
  publicPath: '/',
  devServer: {
    allowedHosts: [
      '.ngrok.io', // Allow hosts matching .ngrok.io
      'localhost',
      '89cf-196-188-35-226.ngrok-free.app'// Allow localhost
      // Add other allowed hosts as needed
    ],
     
  },
};