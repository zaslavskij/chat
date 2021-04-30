import ws from '../../../_common/ws-action-types'

export default function wsRouter(action, connections) {
  if (action.type === ws.CHAT.SEND_TO_SERVER)
    connections.forEach((c) => {
      c.write(
        JSON.stringify({
          type: ws.CHAT.SEND_TO_CLIENT,
          message: action.message,
          nickname: action.nickname,
          selected: action.selected
        })
      )
    })
}
