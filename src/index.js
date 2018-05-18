// https://github.com/monperrus/crawler-user-agents

const crawlers = require('../config/crawler-user-agents');
const axios = require('axios');

const crawlerProxy = async (ctx, next, options) => {
    if (!options.target) {
        throw new('please enter target in options');
    }

    const userAgent = ctx.request.headers['user-agent'];
    const method = ctx.request['method'];
    const url = ctx.request.url;
    const host = ctx.request.headers.host;

    const isCrawler = crawlers.filter(crawler => RegExp(crawler.pattern).test(userAgent)).length > 0;

    if (isCrawler && method === 'GET') {
        try {
            const payload = options.payload || 'url';
            const res = await axios.get(`${options.target}?${payload}=http://${host}${url}`);
            console.log(res.request);
            ctx.body = res.data.html;            
        } catch (e) {
            console.log(e);
            next();
        }
    } else {
        return next();
    }
}

const wrapper = (options) => {
    return (ctx, next) => crawlerProxy(ctx, next, options);
}

module.exports = wrapper;
