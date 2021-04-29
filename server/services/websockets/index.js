import sockjs from 'sockjs'
import wsRouter from './ws-router'

let connections = []

export default function initSockets(app) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async (d) => {
      wsRouter(d, Object.keys(conn), connections.length)
    })
    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
