const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/jwt');

exports.register = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;
    if(!full_name || !email || !password || !confirm_password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if(password !== confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if(userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = new User({ full_name, phone, email, password_hash });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });

  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await User.findOne({ email });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if(!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    return res.status(200).json({ message: 'Login successful', token });

  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
