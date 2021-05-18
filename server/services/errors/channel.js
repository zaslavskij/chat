function ChannelException(message, code) {
  const error = new Error(message)
  error.name = 'ChannelException'
  error.code = code

  error.toString = () => {
    return `${error.name}: ${error.code}\n
    message: ${error.message}`
  }
  return error
}

ChannelException.prototype = Object.create(Error.prototype)

export default ChannelException
