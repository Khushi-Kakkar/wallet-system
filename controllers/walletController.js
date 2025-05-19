const User = require('../models/User');
const Transaction = require('../models/Transaction');
const FraudFlag = require('../models/FraudFlag'); // <-- New model

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;

  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const user = await User.findById(userId);
  user.balance += amount;
  await user.save();

  await Transaction.create({ type: 'deposit', from: userId, amount });

  res.json({ message: 'Deposit successful', newBalance: user.balance });
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;

  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (amount > user.balance) return res.status(400).json({ error: 'Insufficient balance' });

  user.balance -= amount;
  await user.save();

  const txn = await Transaction.create({ type: 'withdraw', from: userId, amount });

  // Fraud check: Large withdrawal
  if (amount > 5000) {
    await FraudFlag.create({
      user: user._id,
      reason: 'Large withdrawal',
      transactionId: txn._id
    });
  }

  res.json({ message: 'Withdrawal successful', newBalance: user.balance });
};

exports.transfer = async (req, res) => {
  const { toUsername, amount } = req.body;
  const fromUser = await User.findById(req.user.userId);
  const toUser = await User.findOne({ username: toUsername });

  if (!toUser) return res.status(404).json({ error: 'Recipient not found' });
  if (fromUser._id.equals(toUser._id)) return res.status(400).json({ error: 'Cannot transfer to self' });
  if (amount <= 0) return res.status(400).json({ error: 'Invalid amount' });
  if (fromUser.balance < amount) return res.status(400).json({ error: 'Insufficient balance' });

  fromUser.balance -= amount;
  toUser.balance += amount;

  await fromUser.save();
  await toUser.save();

  const txn = await Transaction.create({
    type: 'transfer',
    from: fromUser._id,
    to: toUser._id,
    amount
  });

  // Fraud check: Rapid transfers
  const recentTransfers = await Transaction.find({
    from: fromUser._id,
    type: 'transfer',
    timestamp: { $gte: new Date(Date.now() - 60 * 1000) } // last 60 seconds
  });

  if (recentTransfers.length > 3) {
    await FraudFlag.create({
      user: fromUser._id,
      reason: 'High-frequency transfers',
      transactionId: txn._id
    });
  }

  res.json({ message: 'Transfer successful' });
};

exports.history = async (req, res) => {
  const transactions = await Transaction.find({
    $or: [
      { from: req.user.userId },
      { to: req.user.userId }
    ]
  }).sort({ timestamp: -1 });

  res.json(transactions);
};
