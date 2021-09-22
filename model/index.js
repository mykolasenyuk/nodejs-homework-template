const { listContacts } = require('./contacts/listContact')
const { getContactById } = require('./contacts/getContactById')
const { removeContact } = require('./contacts/removeContact')
const { addContact } = require('./contacts/addContact')
const { updateContactById } = require('./contacts/updateContactById')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
