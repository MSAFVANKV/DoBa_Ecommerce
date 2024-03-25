const careerJobsDb = require("../../Modal/Admin/careersModal");

exports.uploadCareerJobs = async (req, res) => {
    console.log('uploadCareerJobs');

    try {
        const {
            title,
            department,
            location,
            education,
            experience,
            skills,
            responsibilities,
            additionalRequirements
        } = req.body;

        if (!title || !department || !location || !education || !experience || !skills || !responsibilities || !additionalRequirements) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const form = new careerJobsDb({
            title,
            department,
            location,
            education,
            experience,
            skills,
            responsibilities,
            additionalRequirements,
        });

        await form.save();
        console.log('Form saved successfully');
        return res.status(200).json({ msg: "Form submitted successfully" });

    } catch (error) {
        console.error(error, 'Internal Server Error adding form');
        res.status(500).json({ error: 'Internal Server Error adding form' });
    }
}
