const Order = require('../models/Order');

exports.getAll = async (res, next) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        const saved = await order.save();
        res.status(201).json(saved);
    } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try {
        // Whitelist the fields that can be updated
        const allowedUpdates = ['status', 'items', 'customer', 'total', 'shippingAddress', 'billingAddress']; // adjust fields as appropriate
        const updates = {};
        for (const key of allowedUpdates) {
            if (req.body.hasOwnProperty(key)) {
                updates[key] = req.body[key];
            }
        }
        const updated = await Order.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Order not found' });
        res.json(updated);
    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        const deleted = await Order.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (err) { next(err); }
};
