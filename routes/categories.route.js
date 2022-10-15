const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');


router.route('/')
.post(categoriesController.createCategory)
.get(categoriesController.getCategory);


router.route('/:id')
.get(categoriesController.getCategoryById)
.patch(categoriesController.updateCategory)



module.exports = router;