const contactsController = require('./contacts')

module.exports = { contactsController }
const getAllContacts = require('./contacts/getAllContacts')
const getById = require('./contacts/getById')
const createContact = require('./contacts/createContact')
const updateContact = require('./contacts/updateContact')
const deleteContact = require('./contacts/deleteContact')
const updateFavorite = require('./contacts/updateFavoriteContact')

module.exports = {
  getAllContacts,
  getById,
  createContact,
  updateContact,
  deleteContact,
  updateFavorite,
}
