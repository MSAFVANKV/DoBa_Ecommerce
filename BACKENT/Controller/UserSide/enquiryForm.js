const enquiryModalCollection = require('../../Modal/User/enquiryModal')

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
    try {
        const {formState} = req.body
        if(!formState){
            return res.status(400).send({ msg: " fields are required." });

        }
        // const form = await enquiryModalCollection.find({})
        const form = new enquiryModalCollection({
            contactNumber:formState.contactNumber,
            email:formState.email,
            fullName:formState.fullName,
            productType:formState.productType,
            businessType:formState.businessType,
            commends:formState.commends,
            read: false,
            sentAt: new Date(),

        })
        await form.save();
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