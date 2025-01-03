const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const authController = require('../controllers/auth.controller')

router.get('/', productController.getProducts)
router.post(
  '/',
  authController.authenticate,
  authController.checkAdminPermission,
  productController.createProduct
)
router.put(
  '/:id',
  authController.authenticate,
  authController.checkAdminPermission,
  productController.updateProduct
)
router.delete(
  '/:id',
  authController.authenticate,
  authController.checkAdminPermission,
  productController.deleteProduct
)
module.exports = router
