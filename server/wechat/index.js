import mongoose from 'mongoose'
import config from '../config'
import Wechat from '../wechat-lib'


const Token = mongoose.model('Token')

const wechatConfig = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appSecret,
        token: config.wechat.token,
        getAccessToken: async () => Token.getAccessToken(),
        saveAccessToken: async () => Token.saveAccessToken()
    }
}

export const getWechat () {
    
    const wechatClient = new Wechat(config.wechat)
    return wechatClient
}

getWechat()