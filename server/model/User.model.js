import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'
import UserAccountException from '../services/errors/account'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    roles: {
      type: [String],
      default: ['user']
    },
    nickname: {
      type: String,
      default() {
        return this.email.split('@')[0]
      },
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamp: true
  }
)

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

// eslint-disable-next-line func-names
userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new UserAccountException('User with those email already registered', 'EMAIL_DUPLICATING'))
  } else {
    next(error)
  }
})

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new UserAccountException('No email provided', 'NO_EMAIL')
    }

    if (!password) {
      throw new UserAccountException('No password provided', 'NO_PASSWORD')
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new UserAccountException('No user found', 'NO_USER')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new UserAccountException('Your email or password incorrect', 'INCORRECT_CREDENTIALS')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
