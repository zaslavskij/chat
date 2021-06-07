import ws from '../../_common/ws-action-types'
import { sendMessage, clearMessages } from './ws-controller/channel'

export default async function wsRouter(action, connections) {
  if (action.type === ws.CHAT.SEND_TO_SERVER) {
    await sendMessage(action, connections)
  }
  if (action.type === ws.CHAT.SEND_TO_SERVER_CLEAR_HISTORY) {
    await clearMessages(action, connections)
  }
}
