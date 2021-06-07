import sockjs from 'sockjs'
import wsRouter from './ws-router'
import ws from '../../_common/ws-action-types'

let connections = []
let usersOnline = []

export default function initSockets(app) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async (d) => {
      const parsedData = JSON.parse(d)
      if (parsedData.type.indexOf('SYSTEM') === -1) {
        await wsRouter(parsedData, connections)
      }
      if (parsedData.type === ws.CHAT.SYSTEM_USER_HELLO) {
        /* eslint-disable no-param-reassign */
        conn.userInfo = {
          nickname: parsedData.nickname,
          channelsCommonIds: parsedData.channelsCommonIds
        }

        if (connections.length) {
          usersOnline = connections
            .filter(
              (c) => typeof c.userInfo !== 'undefined' && typeof c.userInfo.nickname !== 'undefined'
            )
            .map((cn) => cn.userInfo.nickname)

          connections.forEach((c) => {
            c.write(JSON.stringify({ type: ws.CHAT.UPDATE_USERS_ONLINE, usersOnline }))
          })
        }
        /* eslint-enable no-param-reassign */
      }
    })
    conn.on('close', () => {
      connections = connections.filter(
        (c) =>
          c.readyState !== 3 &&
          typeof c.userInfo !== 'undefined' &&
          typeof c.userInfo.nickname !== 'undefined'
      )

      if (connections.length) {
        usersOnline = connections.map((cn) => cn.userInfo.nickname)

        connections.forEach((c) =>
          c.write(JSON.stringify({ type: ws.CHAT.UPDATE_USERS_ONLINE, usersOnline }))
        )
      }
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}

export function getWsConnections() {
  return connections
}
