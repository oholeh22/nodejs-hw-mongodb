import { SORT_ORDER } from '../constans/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { validatePagination } from '../utils/validatePagination.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'name',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.type !== undefined) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  validatePagination(contactsCount, perPage, page);

  const contacts = await ContactsCollection.find()
    .merge(contactsQuery)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
  });
  return contact;
};


export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  return contact;
};

export const updateContact = async (contactId, payload, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  return contact;
};

export const upsertContact = async (contactId, payload) => {
  const contact = await ContactsCollection.findByIdAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
  return { contact };
};
