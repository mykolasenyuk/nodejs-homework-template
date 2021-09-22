const { getContacts, updateContacts } = require('./getContacts.js')
const { v4 } = require('uuid')

const addContact = async (data) => {
  try {
    const contacts = await getContacts()
    const id = v4()
    const newContact = { id, ...data }
    // console.log(`Processing...`)
    contacts.push(newContact)
    await updateContacts(contacts)
    // console.table(contacts)
    // console.log(` ✔️  ${newContact.name} added to Phonebook`)
    return newContact
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  addContact,
}
