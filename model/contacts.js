const { listContacts } = require('./listContact')
const { getContactById } = require('./getContactById')
const { removeContact } = require('./removeContact')
const { addContact } = require('./addContact')
const { updateContactById } = require('./updateContactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
