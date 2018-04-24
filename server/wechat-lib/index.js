import request from 'request-promise'

const base = 'https://api.weixin.qq.com/cgi-bin'

const api = {
    accessToken: base + '/token?grant_type=client_credential'
}
// &appid=APPID&secret=APPSECRET
class Wechat {
    constructor(opts) {
        this.opts = Object.assign({}, opts)
        this.appID = appID
        this.appSecret = opts.appSecret
        this.getAccessToken = opts.getAccessToken
        this.saveAccessToken = opts.saveAccessToken
    }

    // 发请求
    async request(options) {

        options = Object.assign({}, options, { json: true })

        try {
            const response = await request(options)

            return response

        } catch (error) {

            console.error(error)
        }
    }

    // 比较
    async fetchAccessToken() {

        const data = await this.getAccessToken()
        if (!this.isValidAccessToken(data)) {
            return await this.updateAccessToken()
        }

        await this.saveAccessToken()

        return data
    }

    // updateAccessToken
    async updateAccessToken() {
        const url = api.accessToken + '&appid=' + this.appId + '&secret=' + this.appSecret

        const data = await this.request({ url: url })
        const now = (new Date().getTime())
        const expiresIn = now + (data.expires_in - 20) * 1000

        data.expires_in = expiresIn

        return data
    }

    isValidAccessToken(data) {
        if (!data || !data.access_token || !data.expire_in) {
            return false
        }

        const expiresIn = data.expires_in
        const now = (new Date().getTime())

        if (now < expiresIn) {
            return true
        } else {
            return false
        }
    }
}