const {Router} = require('express')
const router = Router();

const { getProductById, getAllProducts, getSimilarProducts, searchProducts } = require('../Controller/UserSide/productsDetails');
const { getUserForm, uploadSingleForm, markMessageAsRead, deleteSingleForm, deleteAllMessages } = require('../Controller/UserSide/singleForm');
const { getEnquiryForm, uploadEnquiryForm, markEnquiryMessageAsRead, deleteEnquiryForm, deleteAllEnquiryMessages } = require('../Controller/UserSide/enquiryForm');

const { getFeedbackForm, uploadFeedbackForm, markFeedMessageAsRead, deleteFeedbackForm, deleteAllFeedbackMessages} = require('../Controller/UserSide/feedbackController');

const {getAllslider} = require('../Controller/UserSide/slider')
const {getVideos, getAllbanner} = require('../Controller/UserSide/bannersUser');
const {getAlljobs,  getjobById } = require('../Controller/UserSide/career');


router
    .route('/get/allproducts')
    .get(getAllProducts)

router.route('/product/:productId').get(getProductById);
router.route('/product/:productId/similar').get(getSimilarProducts);

// ...
router.route(`/search/products/:query`).get(searchProducts);
// ...

// slider

router
    .route('/get/allslider')
    .get(getAllslider)

    // videos
    router
    .route('/get/videos')
    .get(getVideos)

    // banner images
    router
    .route('/get/allbanner')
    .get(getAllbanner)
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

// feedback messages =================================



router.
    route('/form/feedback')
    .post(uploadFeedbackForm)

    
router.
route('/form/feedback/getall')
.get(getFeedbackForm)

router.
route('/form/feedback/:messageId/mark-as-read')
.patch(markFeedMessageAsRead)

router
.route('/form/feedback/delete/:_id')
.delete(deleteFeedbackForm);

router
.route('/form/feedback/deleteAll')
.post(deleteAllFeedbackMessages);

// career job posts

router
    .route('/careers')
    .get(getAlljobs)

router.route('/careers/:jobId').get(getjobById);


module.exports=router;