const express = require('express');
const router = express.Router();
const {getContacts, addContact, getContact, delContact, updateContact} = require('../controllers/contactControllers');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getContacts).post(addContact);
router.route("/:id").put(updateContact).get(getContact).delete(delContact);

module.exports = router;