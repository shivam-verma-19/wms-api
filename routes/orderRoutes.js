const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const ctrl = require('../controllers/orderController');
const rateLimit = require('express-rate-limit');

// Apply rate limiting to DELETE requests (e.g., max 10 per minute per IP)
const deleteLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 delete requests per windowMs
    message: "Too many delete requests from this IP, please try again later."
});

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post(
    '/',
    [
        body('orderNumber').notEmpty(),
        body('items').isArray({ min: 1 }),
        body('items.*.sku').notEmpty(),
        body('items.*.quantity').isInt({ min: 1 })
    ],
    validateRequest,
    ctrl.create
);
router.put('/:id', ctrl.update);
router.delete('/:id', deleteLimiter, ctrl.remove);

module.exports = router;
