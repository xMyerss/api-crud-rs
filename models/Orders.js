const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orederSchema = new Schema({
    created: {
        type: Date,
        default: Date.now,
    },
    customer: {
        type: Schema.ObjectId,
        ref: 'customers',
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'products',
        },
        unitPrice: {
            type: Number,
        },
        quantity: {
            type: Number,
        },
        amount: {
            type: Number,
        },
    }],
    totalAmount: {
        type: Number,
    }
});

module.exports = mongoose.model('orders', orederSchema);