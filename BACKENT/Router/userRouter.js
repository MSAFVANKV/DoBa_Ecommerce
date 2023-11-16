const {Router} = require('express')
const router = Router();

const { getProductById } = require('../Controller/UserSide/productsDetails');
const { getUserForm, uploadSingleForm, markMessageAsRead, deleteSingleForm, deleteAllMessages } = require('../Controller/UserSide/singleForm');



router.route('/product/:productId').get(getProductById);

router.
    route('/singleform')
    .post(uploadSingleForm)

    
router.
route('/singleform/getall')
.get(getUserForm)

router.
route('/singleform/:messageId/mark-as-read')
.patch(markMessageAsRead)

router
.route('/form/delete/:_id')
.delete(deleteSingleForm);

router
.route('/form/deleteAll')
.post(deleteAllMessages);

module.exports=router;