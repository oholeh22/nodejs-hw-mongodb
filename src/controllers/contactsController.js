import { fetchAllContacts, fetchContactById } from '../services/contacts';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await fetchAllContacts.find();
    res.status(200).json(contacts); 
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  try {
    const contact = await fetchContactById(contactId);

    if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch contact.",
      error: error.message,
    });
  }
};

