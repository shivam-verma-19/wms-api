const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const ctrl = require('../controllers/inventoryController');
const rateLimit = require('express-rate-limit');

// Configure a rate limiter for delete requests (e.g., 10 requests per minute per IP)
const deleteLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many delete requests from this IP, please try again after a minute'
});

// Set up rate limiter: max 100 requests per 15 minutes per IP
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router.get('/', limiter, ctrl.getAll);
router.get('/:id', limiter, ctrl.getOne);
router.post(
    '/',
    [
        body('name').notEmpty(),
        body('sku').notEmpty(),
        body('quantity').isInt({ min: 0 }),
        body('location').notEmpty()
    ],
    validateRequest,
    ctrl.create
);
router.put('/:id', limiter, ctrl.update);
router.delete('/:id', deleteLimiter, ctrl.remove);

module.exports = router;
