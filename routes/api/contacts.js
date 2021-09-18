const express = require('express')
const router = express.Router()
const contactsOperations = require('../../model/contacts')
const { contactSchema } = require('../../schemas')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'sucess',
      code: 200,
      data: {
        result: contacts,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      // const error = new Error(`Conatct with ID=${contactId} not found`)
      // error.status = 404
      // throw error
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
      return
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
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
      // const err = new Error(error.message)
      // err.status = 400
      // throw err
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'sucess',
      code: 201,
      message: `✔️ Contact '${req.body.name}' added`,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactsOperations.removeContact(contactId)
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: ' ✔️ Contact deleted',
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
      // const err = new Error(error.message)
      // err.status = 400
      // throw err
    }
    const { contactId } = req.params
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body,
    )
    if (!result) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Conatct with ID=${contactId} not found`,
      })
      return
    }
    res.json({
      status: 'success',
      code: 200,
      message: '✔️ Contact updated',
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
