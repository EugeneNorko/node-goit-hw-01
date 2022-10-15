const contacts = require("./contacts");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;
        case "get":
            const oneContact = await contacts.getContactById(id);
            console.log(oneContact);
            break;

        case "add":
            const newContact = await contacts.addContact({
                name,
                email,
                phone,
            });
            console.log(newContact);
            break;
        case "remove":
            const deletedContact = await contacts.removeContact(id);
            console.log(deletedContact);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
