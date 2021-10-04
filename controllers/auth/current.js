const { User } = require('../../models')

const current = async (req, res) => {
  // console.log(req.user)
  try {
    const { _id } = req.user
    const user = await User.findById(_id)
    console.log(user)
    if (user) {
      res.json({ email: user.email, subscription: user.subscription })
    }
  } catch (error) {
    res.json(error)
  }
}

module.exports = current
