const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    items: [
        {
            sku: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
