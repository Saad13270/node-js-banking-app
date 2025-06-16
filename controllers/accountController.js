const Account = require('../models/accountModel');

// Create new account
exports.createAccount = async (req, res) => {
    try {
        const { accountNumber, customerName, balance } = req.body;
        const account = new Account({ accountNumber, customerName, balance });
        await account.save();
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Deposit funds
exports.deposit = async (req, res) => {
    try {
        const { amount } = req.body;
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        account.balance += amount;
        account.transactions.push({ type: 'deposit', amount });
        await account.save();

        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Withdraw funds
exports.withdraw = async (req, res) => {
    try {
        const { amount } = req.body;
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        if (account.balance < amount)
            return res.status(400).json({ message: 'Insufficient funds' });

        account.balance -= amount;
        account.transactions.push({ type: 'withdraw', amount });
        await account.save();

        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get account details
exports.getAccount = async (req, res) => {
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });
        if (!account) return res.status(404).json({ message: 'Account not found' });

        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
