function ChatException(message, code) {
  const error = new Error(message)
  error.name = 'ChatException'
  error.code = code

  error.toString = () => {
    return `${error.name}: ${error.code}\n
    message: ${error.message}`
  }
  return error
}

ChatException.prototype = Object.create(Error.prototype)

export default ChatException
