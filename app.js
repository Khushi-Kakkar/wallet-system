const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/walletdb';


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' MongoDB connected'))
.catch((err) => console.error(' MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
const walletRoutes = require('./routes/wallet');
app.use('/api/wallet', walletRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
const scheduleFraudScan = require('./cron/fraudScanner');
scheduleFraudScan();


app.get('/', (req, res) => {
  res.send('Wallet API is running!');
});

app.listen(PORT, () => {
  console.log(`R.unning at http://localhost:${PORT}`);
});
