const { getContacts } = require('./getContacts')

const listContacts = async () => {
  try {
    const contacts = await getContacts()
    return contacts
    // console.table(contacts)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  listContacts,
}
