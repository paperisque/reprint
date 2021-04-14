const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('proxy load....')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://webprint.rad',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }

    })
  );
};