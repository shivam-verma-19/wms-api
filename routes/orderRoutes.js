const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const ctrl = require('../controllers/orderController');

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
router.delete('/:id', ctrl.remove);

module.exports = router;
