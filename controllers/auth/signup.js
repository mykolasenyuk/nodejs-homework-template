const { User } = require('../../models')
const { Conflict } = require('http-errors')
const gravatar = require('gravatar')
// const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body
    console.log(req.body)
    const user = await User.findOne({ email })

    if (user) {
      throw new Conflict('Already register')
    }
    const avatarURL = gravatar.url(email)
    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    // const newUser = { email, password: hashPassword, subscription }
    // await User.create(newUser)

    const newUser = new User({ email, subscription, avatarURL })
    newUser.setPassword(password)
    await newUser.save()

    res.status(201).json({
      status: 'success',
      code: 201,
      message: ' Success register',
      newUser,
    })
  } catch (error) {
    res.status(409).json(error)
  }
}
module.exports = signup
