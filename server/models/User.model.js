import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
  roles: {
    type: [String],
    default: ['user']
  }
})

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)

  return next()
})

userSchema.methods = {
  async passwordMatches(password) {
    return bcrypt.compareSync(password, this.password)
  }
}

userSchema.statics = {
  async findAndValidateUser({ email, password }) {
    if (!email) {
      throw new Error('no email')
    }
    if (!password) {
      throw new Error('No password')
    }

    const user = await this.findOne({ email }).exec()

    if (!user) {
      throw new Error('No user found')
    }

    const isPasswordOk = await user.passwordMatches(password)

    if (!isPasswordOk) {
      throw new Error('email or password incorrect')
    }

    return user
  }
}

export default mongoose.model('user', userSchema)
