const Inventory = require('../models/Inventory');

exports.getAll = async (res, next) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) { next(err); }
};

exports.getOne = async (req, res, next) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
    try {
        const item = new Inventory(req.body);
        const saved = await item.save();
        res.status(201).json(saved);
    } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
    try {
        const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Item not found' });
        res.json(updated);
    } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
    try {
        const deleted = await Inventory.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Item not found' });
        res.json({ message: 'Item deleted' });
    } catch (err) { next(err); }
};
