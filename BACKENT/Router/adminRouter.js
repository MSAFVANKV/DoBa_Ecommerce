const {Router} = require('express')
const { adminLogin,createAdmin,logout } = require('../Controller/AdminSide/adminLogin')
const sessionCheck = require('../Middleware/adminSession')
const {uploadFile, getAllProducts, deleteFile} = require('../Controller/AdminSide/products')
const upload = require('../Utilities/imageUpload')

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
router
   .route("/upload")
   .post( upload.fields([
      { name: "image", maxCount: 1 },
    ]),uploadFile);

router
    .route('/allproducts')
    .get(getAllProducts)

router
    .route('/product/delete/:_id')
    .delete(deleteFile);

    router
    .route('/logout')
    .get(logout);



module.exports=router;