const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password_hash');
    if(!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(user);
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
