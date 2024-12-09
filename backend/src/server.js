require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const passwordRoutes = require('./routes/passwordRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB(process.env.MONGODB_URI);

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/password', passwordRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
