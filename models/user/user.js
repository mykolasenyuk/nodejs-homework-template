const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// userSchema.methods.createToken = function () {
//   const { SECRET_KEY } = process.env
//   console.log({ SECRET_KEY })

//   const payload = {
//     _id: this._id,
//   }
//   return jwt.sign(payload, SECRET_KEY)
// }

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  avatarURL: Joi.string(),
  verify: Joi.boolean(),
  verificationToken: Joi.string().min(6),
})

const User = model('user', userSchema)
module.exports = { User, joiSchema }
