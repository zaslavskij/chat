import passportJWT from 'passport-jwt'
import config from '../config'
import User from '../models/User.model'

const cookieExtractor = (req) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
  await User.findById(jwtPayload.uid, async (error, user) => {
    if (error) {
      return done(error, null)
    }
    if (user) {
      return done(null, user)
    }

    return done(null, false)
  })
})

exports.jwt = jwtStrategy
