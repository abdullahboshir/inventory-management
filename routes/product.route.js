const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploader = require('../middleware/uploader');
const verifyToken = require('../middleware/verifyToken');
const authorization = require('../middleware/athorization');


router.post('/file-upload', uploader.array('image'), productController.fileUpload);



router.route('/bulk-update').patch(productController.bulkUpdateProduct)
router.route('/bulk-delete').delete(productController.bulkDeleteProduct)

router.route('/')
.get(productController.getProduct)
.post(verifyToken, authorization('admin', 'store-manage'), productController.createProduct)

router.route('/:id')
.patch(productController.updateProductById)
.delete(authorization('admin'), productController.deleteProductById)


module.exports = router;