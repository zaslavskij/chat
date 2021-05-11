import ws from '../../../_common/ws-action-types'
import { sendMessage } from './ws-controller/index'

export default async function wsRouter(action, connections) {
  if (action.type === ws.CHAT.SEND_TO_SERVER) {
    await sendMessage(action, connections)
  }
}
