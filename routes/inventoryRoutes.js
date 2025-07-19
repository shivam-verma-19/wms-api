const express = require('express');
const router = express.Router();
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

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
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
router.put('/:id', ctrl.update);
router.delete('/:id', deleteLimiter, ctrl.remove);

module.exports = router;
