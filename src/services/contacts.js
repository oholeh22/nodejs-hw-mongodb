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
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const query = { userId };

  if (filter.type !== undefined) {
    query.contactType = filter.type;
  }
  if (filter.isFavourite !== undefined) {
    query.isFavourite = filter.isFavourite;
  }

  const contactsCount = await ContactsCollection.countDocuments(query);

  validatePagination(contactsCount, perPage, page);

  const contacts = await ContactsCollection.find(query)
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

export const upsertContact = async (contactId, payload, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    { ...payload, userId },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
  return { contact };
};
