const express = require('express')
const router = express.Router()

const { contactsController } = require('../../controllers')

router.get('/', contactsController.getAllContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', contactsController.createContact)

router.delete('/:contactId', contactsController.deleteContact)

router.put('/:contactId', contactsController.updateContact)

module.exports = router
