const router = require('express').Router();


const uploadImage = require('../controller/uploadController')
const {getProduct, createProduct} = require('../controller/productController')

router.route('/').get(getProduct).post(createProduct);
router.post('/upload', uploadImage);


module.exports = router;