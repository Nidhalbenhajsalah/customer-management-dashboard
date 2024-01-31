const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory array to store customer data
let customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321' },
  { id: 3, name: 'Bob Smith', email: 'bob@example.com', phone: '1112233445' },
  { id: 4, name: 'Alice Johnson', email: 'alice@example.com', phone: '5556677889' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', phone: '9876543210' },
  { id: 6, name: 'Eva Williams', email: 'eva@example.com', phone: '4567890123' },
  { id: 7, name: 'Michael Davis', email: 'michael@example.com', phone: '9876543210' },
];

// Get all customers
app.get('/api/customers', (req, res) => {
  res.json(customers);
});

// Get a specific customer by ID
app.get('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

// Create a new customer
app.post('/api/customers', (req, res) => {
  const { name, email,phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
    phone
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// Update a customer by ID
app.put('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const { name, email, phone } = req.body;

  if (name) {
    customer.name = name;
  }

  if (email) {
    customer.email = email;
  }
  if (phone) {
    customer.phone = phone;
  }

  res.json(customer);
});

// Delete a customer by ID
app.delete('/api/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const index = customers.findIndex((c) => c.id === customerId);

  if (index === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const deletedCustomer = customers.splice(index, 1)[0];
  res.json(deletedCustomer);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
