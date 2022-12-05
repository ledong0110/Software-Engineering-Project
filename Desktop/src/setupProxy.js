const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    

    app.use(
        createProxyMiddleware('/chat-app/ws/register', {
            target: 'ws://localhost:8000/chat-app/ws/register',
            ws: true,
            changeOrigin: true,
        })
    );
};