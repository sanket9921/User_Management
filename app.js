const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const roleRoutes = require('./routes/role.routes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);

app.get('/', (req, res) => {
  res.send('User Management API is running');
});

module.exports = app;
