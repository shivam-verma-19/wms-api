const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const ctrl = require('../controllers/inventoryController');

// Set up rate limiter: max 100 requests per 15 minutes per IP
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

router.get('/', ctrl.getAll);
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
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
