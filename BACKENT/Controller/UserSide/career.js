const careerJobsDb = require("../../Modal/Admin/careersModal");

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

