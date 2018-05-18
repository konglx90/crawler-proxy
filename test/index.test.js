const Koa = require('koa');
const app = new Koa();

const crawlerProxy = require('../src/index');

app.use(crawlerProxy({
    target: 'http://127.0.0.1:3000/api/html',
    payload: 'url',
}));

// response
app.use(ctx => {
  ctx.body = '<script>document.write("<div>hello ssr is ok</div>")</script>';
});

app.listen(3090);