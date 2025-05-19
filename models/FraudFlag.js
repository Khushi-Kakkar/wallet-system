const mongoose = require('mongoose');

const fraudSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FraudFlag', fraudSchema);
