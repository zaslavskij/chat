function UserAccountException(message, code) {
  const error = new Error(message)
  error.name = 'UserAccountException'
  error.code = code

  error.toString = () => {
    return `${error.name}: ${error.code}\n
    message: ${error.message}`
  }
  return error
}

UserAccountException.prototype = Object.create(Error.prototype)

export default UserAccountException
