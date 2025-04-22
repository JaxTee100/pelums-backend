const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoice-routes');

const emailRoutes = require('./routes/email-route');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/invoices', invoiceRoutes);
app.use('/api/email', emailRoutes);


module.exports = app;
