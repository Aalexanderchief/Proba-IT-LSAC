const express = require('express');
const router = express.Router();
const { forgotPassword } = require('../controllers/passwordController');

router.post('/forgot', forgotPassword);

module.exports = router;
