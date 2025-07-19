const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, min: 0 },
    location: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
