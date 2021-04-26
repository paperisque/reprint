const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('proxy load....')

module.exports = function(app) {
  const proxy_url = process.env.REACT_APP_PROXY_URL
  app.use(
    '/api',
    createProxyMiddleware({
      target: proxy_url,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': ''
      }

    })
  );
};  