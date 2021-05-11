import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    role: {
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

userSchema.method({
  passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
})

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('No Email')
    }
    if (!password) {
      throw new Error('No Password')
    }

    const user = await this.findOne({ email }).exec()
    if (!user) {
      throw new Error('No User')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('PasswordIncorrect')
    }

    return user
  }
}

export default mongoose.model('users', userSchema)
