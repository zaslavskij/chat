function PrivateChatException(message, code) {
  const error = new Error(message)
  error.name = 'PrivateChatException'
  error.code = code

  error.toString = () => {
    return `${error.name}: ${error.code}\n
    message: ${error.message}`
  }
  return error
}

PrivateChatException.prototype = Object.create(Error.prototype)

export default PrivateChatException
