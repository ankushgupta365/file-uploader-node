const express = require('express')
const router = express.Router()

const {getAllProducts,createProduct} = require('../controllers/productController')
const {uploadImageController} = require('../controllers/uploadsController')

router.route('/').post(createProduct).get(getAllProducts)
router.route('/upload').post(uploadImageController)

module.exports = router