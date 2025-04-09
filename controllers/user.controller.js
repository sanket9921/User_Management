const { User, Role } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    const user = await User.create({ firstName, lastName, email, phone, password });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({
        where: { email },
        include: ['Roles']
      });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

const getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id, { include: Role });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  };
  
  const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    await user.update(req.body);
    res.json({ message: 'User updated', user });
  };
  
  const deleteUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    await user.destroy();
    res.json({ message: 'User deleted' });
  };
  
  const disabledUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    await user.update({ isActive: false });
    res.json({ message: 'User disabled' });
  };

  const listUsers = async (req, res) => {
    const { firstName, lastName, email, phone, role } = req.query;
  
    const where = {};
    if (firstName) where.firstName = { [Op.iLike]: `%${firstName}%` };
    if (lastName) where.lastName = { [Op.iLike]: `%${lastName}%` };
    if (email) where.email = { [Op.iLike]: `%${email}%` };
    if (phone) where.phone = { [Op.iLike]: `%${phone}%` };
  
    const users = await User.findAll({
      where,
      include: role
        ? {
            model: Role,
            where: { name: role },
            through: { attributes: [] }
          }
        : Role
    });
  
    res.json(users);
  };
  

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  disabledUser,
  listUsers
};
