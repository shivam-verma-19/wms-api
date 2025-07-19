const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const ctrl = require('../controllers/inventoryController');

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
router.delete('/:id', ctrl.remove);

module.exports = router;
