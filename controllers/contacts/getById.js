const { Contact } = require('../../models')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    // const result = await Contact.findById(
    //   contactId,
    //   '_id name email phone favorite',
    // )
    const result = await Contact.findOne(
      { _id: contactId },
      '_id name email phone favorite',
    )
    if (!result) {
      const error = new Error(`Conatct with ID=${contactId} not found`)
      error.status = 404
      throw error
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Conatct with ID=${contactId} not found`,
      // })
      // return
    }
    res.json({
      status: 'sucess',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
