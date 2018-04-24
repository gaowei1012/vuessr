import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'

export const router = app => {
    const router = new Router()

    // 验证请求
    router.all('/wechat-hear', wechatMiddle(config.wechat, reply))

    app.use(router.routes())
    app.use(router.allowedMethods())
}