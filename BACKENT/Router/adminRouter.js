const {Router} = require('express')
const { adminLogin,createAdmin,logout } = require('../Controller/AdminSide/adminLogin')
const sessionCheck = require('../Middleware/adminSession')

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

    router
    .route('/logout')
    .get(logout);



module.exports=router;