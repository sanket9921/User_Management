const { Role, User } = require('../models');

const createRole = async (req, res) => {
  try {
    const { name } = req.body;

    const role = await Role.create({ name });
    return res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating role' });
  }
};

const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findByPk(userId);
    const role = await Role.findByPk(roleId);

    if (!user || !role) return res.status(404).json({ message: 'User or Role not found' });

    await user.addRole(role);

    return res.status(200).json({ message: 'Role assigned to user' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error assigning role' });
  }
};

module.exports = {
  createRole,
  assignRoleToUser
};
