const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const Invoice = require('../models/Invoice');

const router = express.Router();
const upload = multer(); // Configure multer for file handling

router.post('/:id/send', upload.single('pdf'), async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    // Setup transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'hotmail', or your SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: invoice.customerEmail,
      subject: `Invoice for ${invoice.customerName}`,
      text: `Hello ${invoice.customerName},\n\nPlease find your invoice attached.\n\nThank you!`,
      attachments: [
        {
          filename: `invoice-${invoice._id}.pdf`,
          content: req.file.buffer,
          encoding: 'base64',
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

module.exports = router;
