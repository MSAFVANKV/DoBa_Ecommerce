const feedbackFormCollection = require('../../Modal/User/feedbackModal')

exports.getFeedbackForm = async (req, res) => {
    try {
        const form = await feedbackFormCollection.find({}).sort({_id:-1})
        res.status(200).send(form)
        
    } catch (error) {
        console.error("Error fetching form data:", error);
      res.status(500).send("Internal Server Error fetching form data");
    }
}


exports.uploadFeedbackForm = async (req, res) => {
    try {
        const {phone, email, feedback} = req.body
        if(!req.body){
            console.log(phone, email, feedback,' fields are required')
            return res.status(400).send({ msg: " fields are required." });

        }
        // const form = await feedbackFormCollection.find({})
        const form = new feedbackFormCollection({
            phone:phone,
            email:email,
            feedback:feedback,
            read: false,
            sentAt: new Date(),

        })
        await form.save();
        const savedForm = await feedbackFormCollection.find({});
            res.status(200).json({ details: savedForm, form });
    } catch (error) {
        console.error(error,'Internal Server Error adding feeedback form');
        res.status(500).json({ error: 'Internal Server Error adding feeedback form' });
    }
}

// userFormController.js
exports.markFeedMessageAsRead = async (req, res) => {
    try {
        const messageId = req.params.messageId;
        await feedbackFormCollection.findByIdAndUpdate(messageId, { read: true });
        res.status(200).send({ msg: "Message marked as read successfully" });
    } catch (error) {
        console.error("Error marking message as read:", error);
        res.status(500).send("Internal Server Error marking message as read");
    }
}


module.exports.deleteFeedbackForm = async (req, res) => {
    const { _id } = req.params;

    if(!_id) {
        return res.status(400).send({ msg: "form ID not provided." });
    }
    
    try {
        const form = await feedbackFormCollection.findByIdAndDelete(_id);

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

exports.deleteAllFeedbackMessages = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).send({ msg: 'Invalid message IDs provided.' });
        }

        // Use the ids array to delete multiple messages
        await feedbackFormCollection.deleteMany({ _id: { $in: ids } });

        res.status(200).send({ msg: 'Messages deleted successfully.' });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).send({ error: error.message, msg: 'Internal Server Error deleting messages' });
    }
};