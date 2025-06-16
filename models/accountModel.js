const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountNumber: { type: String, unique: true },
    customerName: String,
    balance: { type: Number, default: 0 },
    transactions: [
        {
            type: { type: String, enum: ['deposit', 'withdraw'] },
            amount: Number,
            date: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Account', accountSchema);
