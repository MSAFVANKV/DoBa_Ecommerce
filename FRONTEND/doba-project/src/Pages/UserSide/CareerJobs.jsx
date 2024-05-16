import axios from "axios";
import React, { useEffect, useState } from "react";
import { userURL } from "../../Base/Constent";
import { useParams } from "react-router-dom";
import ApplyNow from "../../Components/Careers/ApplyNow";

function CareerJobs() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    axios
      .get(`${userURL}/careers`)
      .then((response) => {
        console.log(response);
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error); // Set error state if request fails
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${userURL}/careers/${jobId}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => console.log(error));
  }, [jobId]);

  if (!job) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">{job.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Job Details</h2>
          <p>
            <span className="font-semibold">Department:</span> {job.department}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          <p>
            <span className="font-semibold">Education:</span> {job.education}
          </p>
          <p>
            <span className="font-semibold">Experience:</span> {job.experience}
          </p>
          <p>
            <span className="font-semibold">Additional Requirements:</span>{" "}
            {job.additionalRequirements}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Responsibilities</h2>
          <ul className="list-disc pl-4">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
          <h2 className="text-lg font-semibold mt-6 mb-4">Skills</h2>
          <ul className="list-disc pl-4">
            {job.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      
  <div className="container py-8 flex justify-center items-center">
      <ApplyNow job={job}/>
  </div>
    </div>
  );
}

export default CareerJobs;
