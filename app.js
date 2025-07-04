const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', accountRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
