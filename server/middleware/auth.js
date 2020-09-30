import passport from 'passport'
//  import User from '../model/User.model'

const handleJWT = (req, res, next, roles) => {
  return async (err, user, info) => {
    const error = err || info
    if (error || !user) return res.status(401).json({ status: 401, ...err })

    await req.logIn(user, { session: false })

    if (!roles.includes(user.role)) {
      return res.status(401).json({ status: 401, ...err })
    }
    req.user = user
    return next()
  }
}

const auth = (roles = []) => (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, handleJWT(req, res, next, roles))(
    req,
    res,
    next
  )
}

export default auth
