import PassportJWT from 'passport-jwt'
import User from '../model/User.model'
import config from '../config'

const cookieExtractor = (req) => req && req.cookies && req.cookies.token

const options = {
  secretOrKey: config.secret,
  jwtFromRequest: PassportJWT.ExtractJwt.fromExtractors([cookieExtractor])
}

const JwtStrategy = new PassportJWT.Strategy(options, async (payload, done) => {
  User.findById(payload.uid, (err, user) => {
    if (err) {
      return done(err, null)
    }

    if (user) {
      return done(null, user)
    }

    return done(null, false)
  })
})

exports.jwt = JwtStrategy
