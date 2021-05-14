export default {
  connected: (dispatch) =>
    dispatch({
      type: 'SOCKET_CONNECTED'
    }),
  message: (data) => {
    return JSON.parse(data)
  },
  disconnected: (dispatch) =>
    dispatch({
      type: 'SOCKET_DISCONNECTED'
    })
}
