const careerJobsDb = require("../../Modal/Admin/careersModal");

// Fetch all jobs
module.exports.getAlljobs = async (req, res) => {
    console.log("getAlljobs")
  try {
    const jobs = await careerJobsDb.find();
    if (jobs.length === 0) {
        await careerJobsDb.create({ title: "No Job Found" });
        jobs = await careerJobsDb.find(); // Fetch the jobs again after creating the placeholder
      }
    console.log("getAlljobs ==== ",jobs)

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).send("Internal Server Error fetching jobs");
  }
};

exports.getjobById = async (req, res) => {
  const { jobId } = req.params;
    console.log(jobId,'jobId')
  try {
    const job = await careerJobsDb.findById(jobId);
    res.json({ status: 200, job });
  } catch (error) {
    console.error("Error fetching job details:", error);
    res.status(500).send("Internal Server Error fetching job details");
  }
};

