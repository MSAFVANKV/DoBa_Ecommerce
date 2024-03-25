const adminUser = require('../../Modal/Admin/login');
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

module.exports.getAllAdmins = async (req, res) => {
    // console.log(admin,"admin");

    try {
        const admin = await adminUser.find({});
        //   console.log(admin,"admin");
        res.status(200).send(admin);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ msg: 'Internal server error.' });
    }
};


module.exports.createAdmin = async (req, res) => {

    console.log('create admin');
    const { email, password } = req.body;
    console.log(req.body, "signUpUser req.body");
    if (!email || !password) {
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
    if (email ==="" || password === "") {
        // console.log('Please provide input fields !!');
        return res.status(401).json({ msg: "Please provide input fields !!" });
    }

    try {
        const admin = await adminUser.findOne({ email });

        // Check if the admin with the given email exists
        if (!admin) {
            console.log('No admin account found with this email.');
            return res.status(401).json({ msg: "No admin account found with this email." });
        }

        // Check if the provided password matches the one in the database
        const isValid = await bcrypt.compare(password, admin.password);

        if (!isValid) {
            // console.log('Incorrect password.');
            return res.status(400).json({ msg: "Incorrect password." });
        }

        // If everything's good, set session variables and return a success response
        req.session.adminId = admin._id;
        req.session.isAuthenticated = true;
        console.log("Logged in successfully", req.session.adminId);
        res.status(200).send({ email: admin.email });

    } catch (err) {
        console.error("Error during admin login:", err);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

module.exports.logout = (req, res) => {
    try {
        req.session.destroy();
        console.log("Admin logged out successfully.");
        res.status(200).send({ msg: "Admin logged out successfully" });
    } catch (error) {
        console.log("Error signing out admin: " + error);
        return res.status(500).send({ msg: "Couldn't log out." });
    }
};


module.exports.deleteAdmin = async (req, res) => {
    const adminId = req.params.adminId;

    try {
        await adminUser.findByIdAndDelete(adminId);
        console.log(`Admin with ID ${adminId} deleted successfully.`);
        res.status(200).json({ msg: 'Admin deleted successfully.' });
    } catch (error) {
        console.error(`Error deleting admin with ID ${adminId}:`, error);
        res.status(500).json({ msg: 'Internal server error.' });
    }
};

// module.exports.resetPassword = async (req, res) => {
//     console.log('No admin ');

//   const { email } = req.body;

//   try {
//     // Check if the admin with the given email exists
//     const admin = await adminUser.findOne({ email });

//     if (!admin) {
//       console.log('No admin account found with this email.');
//       return res.status(404).send({ msg: 'No admin account found with this email.' });
//     }

//     // Generate a unique token for password reset
//     const resetToken = uuidv4();

//     // Save the reset token and its expiration date to the admin document
//     admin.resetPasswordToken = resetToken;
//     admin.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

//     await admin.save();

//     // Send the reset token to the admin's email (You'll need to implement this part)

//     console.log(`Reset token sent to ${email}`);

//     // Return success response
//     return res.status(200).send({ msg: 'Password reset instructions sent to your email.' });
//   } catch (error) {
//     console.error('Error during password reset:', error);
//     return res.status(500).json({ msg: 'Internal server error.' });
//   }
// };
module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const admin = await adminUser.findOne({ email: email });
        if (!admin) {
            console.log('No admin account found with this email.');
            return res.send({ Status: 'No admin account found with this email.' });
        }
        const token = jwt.sign({id: admin._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.SMTP_MAIL,
              pass: process.env.NODE_MAILER_SCUIRITY_KEY
            }
          });
          
          var mailOptions = {
            from: process.env.SMTP_MAIL,
            to: process.env.SMTP_MAIL,
            subject: 'Reset Your Password',
            html: `
            <div style="background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #3498db;">CLICK THE LINK:</h2>
            https://dobafoods.com/admin/reset-password/${admin._id}/${token}
            </div>
            </div>
            `
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status:"Success token"})
            }
          });

    } catch (error) {

    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const {id, token} = req.params;
        const {password} = req.body

        jwt.verify(token,"jwt_secret_key",(err,decoded) => {
            if(err){
                return res.json({Status:"Error with token"})
            } else {
                bcrypt.hash(password, 12)
                .then(hash => {
                    adminUser.findByIdAndUpdate({_id: id},{password:hash})
                    .then(u => res.send({Status:"Success"}))
                    .catch(err => res.send({Status:err}))
                })
                .catch(err => res.send({Status:err}))
            }
        })
    } catch (error) {
        console.log(error,"error in reset password")
    }
}