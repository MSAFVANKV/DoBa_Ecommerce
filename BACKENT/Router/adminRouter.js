const {Router} = require('express')
const { adminLogin,createAdmin,logout } = require('../Controller/AdminSide/adminLogin')
const sessionCheck = require('../Middleware/adminSession')
const {uploadFile, getAllProducts, deleteFile, editFile} = require('../Controller/AdminSide/products');
const {getAllslider, uploadSlider, deleteSlider} = require('../Controller/AdminSide/slider')
const { uploadBanner, getAllbanner, deleteBanner } = require('../Controller/AdminSide/banner')
const { getVideos, create, deleteVideos } = require('../Controller/AdminSide/videocontroller')



const upload = require('../Utilities/imageUpload')
const fileUpload = require('../Utilities/fileUpload')
const videoUpload = require('../Utilities/videoupload')



const router = Router();

router  
    .route('/login')
    .post(adminLogin)

router  
    .route('/signup')
    .post(createAdmin);

    router.get('/check-auth', (req, res) => {
        if (req.session.adminId) {
            return res.status(200).send({ isAuthenticated: true });
        } 
        else {
            return res.status(200).send({ isAuthenticated: false });
        }
    });

    // router.post('/upload', upload.single('image'), uploadFile);
// router
//    .route("/upload")
//    .post( upload.fields([
//       { name: "images", maxCount: 2 },
//     ]),uploadFile);

router
.route("/upload")
.post( upload.fields([
   { name: "images", maxCount: 2 },
]),uploadFile);



router
    .route('/allproducts')
    .get(getAllProducts)

    
router
    .route('/product/edit')
    .put(upload.fields([{ name: 'images', maxCount: 2 }]), editFile);

router
    .route('/product/delete/:_id')
    .delete(deleteFile);

// slider uploaders

router
   .route("/upload/slider")
   .post( fileUpload.fields([
      { name: "image", maxCount: 1 },
    ]),uploadSlider);

router
    .route('/allslider')
    .get(getAllslider)

router
    .route('/slider/delete/:_id')
    .delete(deleteSlider);



router
    .route('/logout')
    .get(logout);

// banner

   router
   .route("/upload/banner")
   .post( fileUpload.fields([
      { name: "image", maxCount: 1 },
    ]),uploadBanner);


router
    .route('/allbanner')
    .get(getAllbanner)

    router
    .route('/banner/delete/:_id')
    .delete(deleteBanner);

    // videoos

    router
    .route("/upload/video")
    .post( videoUpload.fields([
       { name: "videos", maxCount: 5 },
     ]),create);
 

    router
    .route('/videos')
    .get(getVideos)

    router
    .route('/videos/delete/:_id')
    .delete(deleteVideos);
// router
//     .route('/banner/delete/:_id')
//     .delete(deleteBanner);


module.exports=router;