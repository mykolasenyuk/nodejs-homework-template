const jwt = require('jsonwebtoken')
// const { Unauthorized } = require('http-errors')
const { User } = require('../models')

const authenticate = async (req, res, next) => {
  // console.log(req.headers.authorization)
  const { authorization } = req.headers
  if (!authorization) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
    return
  }

  const [bearer, token] = authorization.split(' ')
  // console.log([bearer, token])

  if (bearer !== 'Bearer') {
    // throw new Unauthorized()
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized',
    })
    return
  }
  try {
    const { SECRET_KEY } = process.env
    // console.log({ SECRET_KEY })
    const { _id } = jwt.verify(token, SECRET_KEY)
    // console.log(jwt.verify(token, SECRET_KEY))
    const user = await User.findById({ _id })

    if (!user.token) {
      res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Not authorized',
      })
      return
      //   throw new Unauthorized()
    }
    req.user = user
    next()
  } catch (error) {
    res.json(error)
  }
}

module.exports = authenticate
