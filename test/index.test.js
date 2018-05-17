const Koa = require('koa');
const app = new Koa();

const crawlerProxy = require('../src/index');

app.use(crawlerProxy({
    target: 'http://www.baidu.com'
}));

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);