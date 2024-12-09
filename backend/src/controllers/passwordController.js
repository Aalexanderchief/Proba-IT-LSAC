exports.forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      if(!email) return res.status(400).json({ message: 'Email required' });
      // In real scenario, send an email with reset link
      return res.status(200).json({ message: 'If this email exists, a reset link was sent (dummy).' });
    } catch(err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  