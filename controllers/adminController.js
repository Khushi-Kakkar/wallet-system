const FraudFlag = require('../models/FraudFlag');
const User = require('../models/User');

exports.getFlags = async (req, res) => {
  const flags = await FraudFlag.find()
    .populate('user', 'username')
    .populate('transactionId')
    .sort({ timestamp: -1 });

  res.json(flags);
};

exports.topUsers = async (req, res) => {
  const top = await User.find()
    .sort({ balance: -1 })
    .limit(5)
    .select('username balance');

  res.json(top);
};

exports.totalBalance = async (req, res) => {
  const agg = await User.aggregate([
    { $group: { _id: null, total: { $sum: '$balance' } } }
  ]);

  res.json({ totalBalance: agg[0]?.total || 0 });
};
