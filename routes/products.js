const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController');

// 新增產品
router.post('/', productController.addProduct);

// 讀取所有產品
router.get('/', productController.getAllProducts);

// 刪除產品
router.delete('/:id', productController.deleteProduct);

module.exports = router;
