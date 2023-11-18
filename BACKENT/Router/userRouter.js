const {Router} = require('express')
const router = Router();

const { getProductById } = require('../Controller/UserSide/productsDetails');
const { getUserForm, uploadSingleForm, markMessageAsRead, deleteSingleForm, deleteAllMessages } = require('../Controller/UserSide/singleForm');
const { getEnquiryForm, uploadEnquiryForm, markEnquiryMessageAsRead, deleteEnquiryForm, deleteAllEnquiryMessages } = require('../Controller/UserSide/enquiryForm');



router.route('/product/:productId').get(getProductById);

// the single purchase routes

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


// enquiry form sarts

router.
    route('/form/enquiry')
    .post(uploadEnquiryForm)

    
router.
route('/form/enquiy/getall')
.get(getEnquiryForm)

router.
route('/form/enquiy/:messageId/mark-as-read')
.patch(markEnquiryMessageAsRead)

router
.route('/form/enquiy/delete/:_id')
.delete(deleteEnquiryForm);

router
.route('/form/enquiy/deleteAll')
.post(deleteAllEnquiryMessages);

module.exports=router;