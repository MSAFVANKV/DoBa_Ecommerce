const enquiryModalCollection = require('../../Modal/User/enquiryModal')
const nodemailer = require('nodemailer')

exports.getEnquiryForm = async (req, res) => {
    try {
        const form = await enquiryModalCollection.find({}).sort({_id:-1})
        res.status(200).send(form)
        
    } catch (error) {
        console.error("Error fetching form data:", error);
      res.status(500).send("Internal Server Error fetching form data");
    }
}


exports.uploadEnquiryForm = async (req, res) => {
  console.log('555');

    try {
      console.log('1');

        const {formState} = req.body
        if(!formState){
            return res.status(400).send({ msg: " fields are required." });

        }
        // const form = await enquiryModalCollection.find({})
        const form = new enquiryModalCollection({
            contactNumber:formState.contactNumber,
            email:formState.email,
            fullName:formState.fullName,
            // productType:formState.productType,
            businessType:formState.businessType,
            commends:formState.commends,
            pincode:formState.pincode,
            postOffice:formState.postOffice,
            district:formState.district,
            state:formState.state,
            read: false,
            sentAt: new Date(),

        })
        await form.save();
        console.log('sms sent successfully');
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
              user: process.env.SMTP_MAIL,
              pass: process.env.NODE_MAILER_SCUIRITY_KEY
            }
          });

          const mailOptions = {
            from: formState.email,
            to: process.env.SMTP_MAIL,
            subject: "New Message from User - DoBa Admin",
            html: `
              <div style="background-color: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h2 style="text-align: center; color: #3498db;">New Message from User: Enquiry</h2>
                  <div style="padding: 20px;">
                    <p><strong>User Information:</strong></p>
                    <p><strong>Email:</strong> ${formState.email}</p>
                    <p><strong>Phone Number:</strong> ${formState.contactNumber}</p>
                    <p><strong>Product of Interest:</strong> ${formState.businessType}</p>
                    <p><strong>Check the messages in given link:</strong></p>
                    <span>https://dobafoods.com/admin</span>
                  </div>
                  <div style="margin-top: 20px; text-align: center; color: #888; font-size: 12px;">
                    <p>This is an automated message. Please do not reply to this email.</p>
                  </div>
                </div>
              </div>
            `,
          };
          

          
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("sms sending error" + error);
          // return res.render('user/partials/signup', { message: 'Failed to send OTP. Please try again later.' });
        } else {
          console.log('sms sent successfully');
        //   return res.redirect("/verifyOTP")
        }
      });   
        const savedForm = await enquiryModalCollection.find({});
            res.status(200).json({ details: savedForm, form });
    } catch (error) {
        console.error(error,'Internal Server Error adding enquiry form');
        res.status(500).json({ error: 'Internal Server Error adding enquiry form' });
    }
}

// userFormController.js
exports.markEnquiryMessageAsRead = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        await enquiryModalCollection.findByIdAndUpdate(messageId, { read: true });
        res.status(200).send({ msg: "Message marked as read successfully" });
    } catch (error) {
        console.error("Error marking message as read:", error);
        res.status(500).send("Internal Server Error marking message as read");
    }
}


module.exports.deleteEnquiryForm = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "form ID not provided." });
    }
    
    try {
        const form = await enquiryModalCollection.findByIdAndDelete(_id);

        if (!form) {
            console.log('form not found.');
            return res.status(404).send({ msg: "form not found." });
        }
        console.log('Deleted successfully');
        res.send({ msg: 'Deleted successfully', form });
    } catch (error) {
        console.error("Error deleting form:", error);
        res.status(500).send({ error: error.message, msg: "Internal Server Error deleting form" });
    }
}

exports.deleteAllEnquiryMessages = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).send({ msg: 'Invalid message IDs provided.' });
        }

        // Use the ids array to delete multiple messages
        await enquiryModalCollection.deleteMany({ _id: { $in: ids } });

        res.status(200).send({ msg: 'Messages deleted successfully.' });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).send({ error: error.message, msg: 'Internal Server Error deleting messages' });
    }
};