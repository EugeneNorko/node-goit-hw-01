const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const idToString = String(contactId);
    const result = contacts.find((item) => item.id === idToString);
    return result || null;
}

async function removeContact(contactId) {
    const contacts = await listContacts();
    const idToString = String(contactId);
    const index = contacts.findIndex((item) => item.id === idToString);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

async function addContact(data) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};
