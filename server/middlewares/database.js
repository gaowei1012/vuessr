import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import { resolve } from 'path'

const models = resolve(__driname, '../database/schema')

fs.readdirSync(modles)
    .filter(file => ~file.search(/^[^\.].*js$/))
    forEach(file => require(resolve(models, file)))

export const database = app => {
    mongoose.set('debug', true)

    mongoose.connect(config.db)

    mongoose.connection.on('disconnected', () => {
        mongoose.connect(config.db)
    })

    mongoose.connection.on('error', () => {
        console.error(err)
    })

    mongoose.connection.on('open', () => {

        console.log(config.db)
    })

}