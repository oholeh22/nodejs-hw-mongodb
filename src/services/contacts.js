import { ContactsCollection, Contact } from '../db/models/contacts.js';

export const getAllContacts = async (page, perPage) => {
  const totalItems = await Contact.countDocuments();
  const skip = (page - 1) * perPage;
  const contacts = await Contact.find().skip(skip).limit(perPage);
  return { totalItems, contacts };
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
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
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
