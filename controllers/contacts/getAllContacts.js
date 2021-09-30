
const { Contact } = require('../../models')

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, '_id name email phone favorite')
    res.json({
      status: 'success',
      code: 200,
      data: { contacts },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = getAllContacts
