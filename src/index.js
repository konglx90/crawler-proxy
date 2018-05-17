// https://github.com/monperrus/crawler-user-agents

const crawlers = require('../config/crawler-user-agents');
const axios = require('axios');

const crawlerProxy = async (ctx, next, options) => {
    const userAgent = ctx.request.headers['user-agent'];
    const method = ctx.request['method'];
    console.log('method', ctx.request.method);
    const isCrawler = crawlers.filter(crawler => {
        return RegExp(crawler.pattern).test(userAgent);
    }).length > 0;

    if (!isCrawler && method === 'GET') {
        const res = await axios.get(options.target);
        ctx.body = res.data;
    } else {
        return next();
    }
}

const wrapper = (options) => {
    return (ctx, next) => crawlerProxy(ctx, next, options);
}

module.exports = wrapper;
