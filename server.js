const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());

app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/companies', require('./routes/companyRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
