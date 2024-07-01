const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
connectDB();

app.use(cors());

app.use(bodyParser.json());

app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/companyRoutes'));
app.use('/api', require('./routes/projectRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
