import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import passport from 'passport'

import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import swaggerOptions from './docs/swagger-options'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'

import auth from './middleware/auth'

import config from './config'
import Html from '../client/html'

import regRouter from './routes/register'
import authRouter from './routes/auth'
import channelRouter from './routes/channel'

import webSockets from './websockets'

const Root = () => ''

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  // eslint-disable-next-line
  console.log(Root)
} catch (ex) {
  // eslint-disable-next-line
  console.log(' run yarn build:prod to enable ssr')
}

const port = process.env.PORT || 8090
const server = express()

const specs = swaggerJsdoc(swaggerOptions)
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

mongooseService.connect()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => server.use(it))

server.use('/api/v1/register', regRouter)
server.use('/api/v1/auth', authRouter)
server.use('/api/v1/channels', auth(['user']), channelRouter)

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial - Become an IT HERO'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  webSockets(app)
}

// eslint-disable-next-line
console.log(`Serving at http://localhost:${port}`)
