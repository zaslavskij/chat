import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import passport from 'passport'

import mongooseService from './services/mongoose'
import passportJWT from './services/passport'

import config from './config'
import Html from '../client/html'

import regRouter from './routes/register'
import authRouter from './routes/auth'

let connections = []

const Root = () => ''

// const usersData = [
//   {
//     email: 'steve@jobs.com',
//     password: 'huislona1',
//     channels: ['general', 'dev talks', 'mvp']
//   },
//   {
//     email: 'anna@pavkina.com',
//     password: 'huislona1',
//     channels: ['general', 'mvp']
//   },
//   {
//     email: 'alex@zaslavskij.com',
//     password: 'huislona1',
//     channels: ['general']
//   }
// ]

// usersData.forEach(async (item) => {
//   const user = new User(item)
//   await user.save()
// })

// const channels = [
//   {
//     title: 'general',
//     users: [],
//     messages: []
//   },
//   {
//     title: 'mvp',
//     users: [],
//     messages: []
//   },
//   {
//     title: 'dev talks',
//     users: [],
//     messages: []
//   }
// ]

// channels.forEach(async (item) => {
//   const channel = new Channel(item)
//   await channel.save()
// })

try {
  // eslint-disable-next-line import/no-unresolved
  // ;(async () => {
  //   const items = await import('../dist/assets/js/root.bundle')
  //   console.log(JSON.stringify(items))

  //   Root = (props) => <items.Root {...props} />
  //   console.log(JSON.stringify(items.Root))
  // })()
  console.log(Root)
} catch (ex) {
  console.log(' run yarn build:prod to enable ssr')
}

const port = process.env.PORT || 8090
const server = express()

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
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
