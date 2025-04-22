const Invoice = require('../models/Invoice');

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Log the incoming request body
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    console.error('Error creating invoice from controller:', error);  // Log any error
    res.status(400).json({ message: error.message });
  }
};


// Get All Invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Invoice
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params  .id, req.body, { new: true });
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });                        
    res.json(invoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }         
}
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Invoice.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    console.error('Error deleting invoice:', err);
    res.status(500).json({ message: 'Server error' });
  }
}
module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice}