const adminUser = require('../../Modal/Admin/login');
const bcrypt = require('bcryptjs')

module.exports.createAdmin = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body,"signUpUser req.body");
    if (!email || !password ) {
        return res.status(400).send({ msg: "Email, password, are required." });
    }
    try {
        let admin = await adminUser.findOne({ email });
        if (admin) {
            console.log("Email conflict for:", email);
            return res.status(400).send({ msg: "Email already exists." });

        }
            const hashPsw = await bcrypt.hash(password, 12);
            admin = new adminUser({
                email,
                password: hashPsw
            })
            req.session.adminId = admin._id;
            const data = await admin.save();
            console.log("Created admin successfully");
            res.status(201).send({ email: data.email });
        
    } catch (error) {
        console.log("Error during admin login:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}


module.exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await adminUser.findOne({ email });

        // Check if the admin with the given email exists
        if (!admin) {
            console.log('No admin account found with this email.');
            return res.status(401).send({ msg: "No admin account found with this email." });
        }
       
        // Check if the provided password matches the one in the database
        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            console.log('Incorrect password.');
            return res.status(400).send({ msg: "Incorrect password." });
        }

        // If everything's good, set session variables and return a success response
        req.session.adminId = admin._id; 
        req.session.isAuthenticated = true;
        console.log("Logged in successfully",req.session.adminId);
        res.status(200).send({ email: admin.email });

    } catch (err) {
        console.error("Error during admin login:", err);
        return res.status(500).json({ msg: "Internal server error." });
    }
};