import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const result = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return result?.value || null; 
};

export const updateContact = async (contactId, payload) => {
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    {
      _id: contactId,
    },
    payload,
    { new: true },
  );

  if (!rawResult) return null;

  return {
    contact: rawResult,
  };
};
