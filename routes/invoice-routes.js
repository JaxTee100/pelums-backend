const express = require('express');
const { createInvoice, getInvoices, getInvoiceById, updateInvoice } = require('../controllers/invoice-controller');
const router = express.Router();

router.post('/', createInvoice);
router.get('/', getInvoices);
router.get('/:id', getInvoiceById);
router.put('/:id', updateInvoice);
  

module.exports = router;
