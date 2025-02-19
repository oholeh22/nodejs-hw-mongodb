import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  patchContactController,
  upsertContactController,
} from "../controllers/contacts.js";
import { contactCreateSchema, contactUpdateSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post(
  "/",
  upload.single("photo"),
  validateBody(contactCreateSchema),
  ctrlWrapper(createContactController)
);

router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));

router.put("/:contactId", isValidId, ctrlWrapper(upsertContactController));

router.patch(
  "/:contactId",
  isValidId,
  upload.single("photo"),
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController)
);

export default router;
