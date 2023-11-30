const adminSessionCheck = (req, res, next) => {
    if (req.session.adminId) {  // Use the same casing
        next();
    } else {
        res.redirect('/admin');
    }
}

module.exports = {adminSessionCheck}