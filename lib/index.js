import express from 'express';
import path from 'path';
import config from './config'
import proxy from 'http-proxy-middleware'

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const proxies = config.get('proxies');

proxies.forEach(({ pathname, target }) => {
    app.use(`/api/${pathname}`, proxy({
        target: target,
        pathRewrite: {
            [`^/api/${pathname}`]: ''
        },
        changeOrigin: true
    }));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err)
});

app.listen(config.get('port'), function() {
    console.log(`Example app listening on port ${config.get('port')}!`)
});
