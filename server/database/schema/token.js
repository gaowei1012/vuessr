const mongose = require('mongoose')
const Sechma = mongoose.Sechma

// sechma 数据模型
const TokenSchema = new mongoose.Schema({
    name: String,
    token: String,
    expires_in: Number,
    meta: {
        created: {
            type: Date,
            default: Date.now()
        },
        updated: {
            type: Date,
            default: Date.now()
        }
    }
})

TokenSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAtb = this.meta.updatedAt = Date.now()
    } else {
        this.meta.updatedAt = Date.now()
    }

    next()
})

TokenSchema.statics = {
    async getAccessToken() {
        const token = await this.findOne({
            name: 'access_token'
        })

        return token
    }

    async savaAccessToken(data) {
        let token = await this.findOne({
            name: 'access_token'
        }).exec()

        if (token) {
            token.token = data.access_token
            token.expires_in = data.expires_in
        } else {
            token = new Token({
                name: 'access_token',
                token: data.access_token,
                expires_in: data.expires_in
            })
        }

        await token.save()

        return data
    }
}

const Token = mongoose.model('Token', TokenSchema)