const adminSessionCheck = (req, res, next) => {
    if (req.session.adminId) {  // Use the same casing
        next();
    } else {
        res.redirect('/admin/login');
    }
}

module.exports = {adminSessionCheck}