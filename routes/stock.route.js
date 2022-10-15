const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');



router.route('/bulk-update').patch(stockController.bulkUpdateStock)
// router.route('/bulk-delete').delete(stockController.bulkDeleteStock)

router.route('/')
.get(stockController.getStock)
.post(stockController.createStock)

router.route('/:id')
.patch(stockController.updateStockById)
.delete(stockController.deleteStockById)
.get(stockController.getStockById)


module.exports = router;