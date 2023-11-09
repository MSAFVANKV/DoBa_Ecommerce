const {Router} = require('express')
const router = Router();

const { getProductById } = require('../Controller/UserSide/productsDetails');


router.route('/product/:productId').get(getProductById);


module.exports=router;