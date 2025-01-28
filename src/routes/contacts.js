import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    deleteContactController,
    upsertContactController,
    patchContactController,
  } from '../controllers/contacts.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIdController));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));


export default router;
