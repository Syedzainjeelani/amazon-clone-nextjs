import { join } from 'path'
import { https } from 'firebase-functions'
import { default as next } from 'next'

const isDev = process.env.NODE_ENV !== 'production'
// const nextjsDistDir = join('src', require('./src/next.config.js').distDir)
const nextjsDistDir = join('src', '../.next')

const nextjsServer = next({
    dev: isDev,
    conf: {
        distDir: nextjsDistDir,
    },
})
const nextjsHandle = nextjsServer.getRequestHandler()

export const nextjsFunc = https.onRequest(async (req, res) => {
    await nextjsServer.prepare()
    return await nextjsHandle(req, res)
})