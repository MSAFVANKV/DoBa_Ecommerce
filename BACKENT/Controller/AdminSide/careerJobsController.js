const careerJobsDb = require("../../Modal/Admin/careersModal");

exports.uploadCareerJobs = async (req, res) => {
  console.log("uploadCareerJobs");

  try {
    const {
      title,
      department,
      location,
      education,
      experience,
      skills,
      responsibilities,
      additionalRequirements,
    } = req.body;

    if (
      !title ||
      !department ||
      !location ||
      !education ||
      !experience ||
      !skills ||
      !responsibilities ||
      !additionalRequirements
    ) {
      return res
        .status(400)
        .json({ msg: "All fields are required.", submission: false });
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
    console.log("Form saved successfully");
    return res.status(200).json({ msg: "Form submitted successfully" });
  } catch (error) {
    console.error(error, "Internal Server Error adding form");
    res
      .status(500)
      .json({ error: "Internal Server Error adding form", submition: false });
  }
};

exports.deleteCareerJobs = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("job not found.", _id);

    if (!_id) {
      return res.status(400).send({ msg: "Product ID not provided." });
    }

    const job = await careerJobsDb.findByIdAndDelete(_id);

    if (!job) {
      console.log("job not found.");
      return res.status(404).send({ msg: "job not found." });
    }
    console.log("Deleted successfully");
    res.send({ msg: "Deleted successfully", job });
  } catch {}
};
