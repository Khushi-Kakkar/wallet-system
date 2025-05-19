const cron = require('node-cron');
const Transaction = require('../models/Transaction');
const FraudFlag = require('../models/FraudFlag');
const User = require('../models/User');

const scheduleFraudScan = () => {
  cron.schedule('0 2 * * *', async () => {
    console.log('[🕑 Cron] Running daily fraud scan at 2 AM');

    const threshold = 5000;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const largeWithdrawals = await Transaction.find({
      type: 'withdraw',
      amount: { $gt: threshold },
      timestamp: { $gte: oneDayAgo }
    });

    for (let txn of largeWithdrawals) {
      const alreadyFlagged = await FraudFlag.findOne({ transactionId: txn._id });
      if (!alreadyFlagged) {
        await FraudFlag.create({
          user: txn.from,
          reason: 'Large withdrawal (daily scan)',
          transactionId: txn._id
        });
      }
    }

    console.log(`[✅ Cron] Scanned ${largeWithdrawals.length} withdrawals`);
  });
};

module.exports = scheduleFraudScan;
