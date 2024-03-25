import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { userURL } from "../../Base/Constent";

function Careers() {
  // Sample data for job postings
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get(`${userURL}/careers`)
      .then((response) => {
        console.log(response)
        setJobs(response.data);
      })
      .catch((error) => console.log(error));
  }, [jobs]);
  return (
    <div className="section-container container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Join Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{job.location}</p>
            <p className="text-sm text-gray-500 mb-4">{job.department}</p>
            <p className="text-sm mb-4">{job.description}</p>
            <Link
              to={`/careers/${job._id}`}
              className="text-[#F26D1E] font-semibold hover:underline"
            >
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Careers;
