import Contact  from '../db/models/contacts.js';

export const fetchAllContacts = async () => {
  return await Contact.find();
};

export const fetchContactById = async (id) => {
  return await Contact.findById(id);
};
