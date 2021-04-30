import ws from '../../../_common/ws-action-types'

export default function wsRouter(action, connections) {
  if (action.type === ws.CHAT.SEND_MESSAGE) console.log(action.message)
  else console.log(connections)
}
