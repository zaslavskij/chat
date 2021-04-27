const initialState = {
  general: {
    users: [],
    messages: [{ timestamp: +new Date(), author: 'me', message: 'some awesome text' }]
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
