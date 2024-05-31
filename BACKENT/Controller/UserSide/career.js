const careerJobsDb = require("../../Modal/Admin/careersModal");
const aplliedJobs = require("../../Modal/User/appliedJobsModal");


// Fetch all jobs
module.exports.getAlljobs = async (req, res) => {
    console.log("getAlljobs")
  try {
    const jobs = await careerJobsDb.find();
    if (!jobs) return res.status(401).json({ msg: "No Job Found" });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error fetching jobs");
  }
};

exports.getjobById = async (req, res) => {
  const { jobId } = req.params;
  //   console.log(jobId,'jobId')
      try {
        const job = await careerJobsDb.findById(jobId);
        res.status(200).json(job);
      } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error fetching product details");
      }
};

exports.applyJobs = async (req, res) => {
  try {
    const { name, address, phone, email, position, workingExperience, prevcompany } = req.body.values;
    console.log(name, "req.body");

    // Check if all required fields are present
    if (!name || !address || !phone || !email || !position || !workingExperience || !prevcompany) {
      return res.status(400).send({ msg: "All fields are required." });
    }

    // Create a new entry in the database using the received form data
    const newApplication = new aplliedJobs({
      fullName: name,
      address: address,
      contactNumber: phone,
      email: email,
      position: position,
      workingExperience: workingExperience,
      prevcompany: prevcompany,
      read: false,
      sentAt: new Date(),
    });

    // Save the new entry to the database
    await newApplication.save();

    // Respond with a success message
    return res.status(200).send({ msg: "Application submitted successfully." });
  } catch (error) {
    console.log(error, "error from backend applyjobs");
    // If an error occurs, respond with an error message
    return res.status(500).send({ msg: "Internal server error." });
  }
};

