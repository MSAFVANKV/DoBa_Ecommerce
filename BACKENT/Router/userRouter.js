const {Router} = require('express')
const router = Router();

const { getProductById } = require('../Controller/UserSide/productsDetails');
const { getUserForm, uploadSingleForm } = require('../Controller/UserSide/singleForm');



router.route('/product/:productId').get(getProductById);

router.
    route('/singleform')
    .post(uploadSingleForm)

    
router.
route('/singleform/getall')
.get(getUserForm)

module.exports=router;