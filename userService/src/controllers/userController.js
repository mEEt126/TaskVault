const { User } = require('../models/');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    console.log(req.body)
    const { username, emailId, password, phoneNo } = req.body;
    const user = await User.create({ username:username, emailId:emailId, password:password, phoneNo:phoneNo });
    res.status(201).json(user);
  } catch (error) {
    console.log('Error:', error.response ? error.response.data : error.message)
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    //console.log(req.params.id)
    const user = await User.findByPk(req.params.id);
    console.log(user)
    if (!user) {
      console.log("user not found")
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, emailId, password, phoneNo } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ username, emailId, password, phoneNo });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
