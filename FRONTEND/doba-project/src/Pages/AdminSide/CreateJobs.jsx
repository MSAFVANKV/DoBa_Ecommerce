import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminbaseURL, userURL } from "../../Base/Constent";
import JobsFeedAdmin from "./JobsFeedAdmin";
import { RiDeleteBinLine } from 'react-icons/ri';

function CreateJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    updateJobs();
  }, [jobs]);

  const updateJobs = () => {
    axios
      .get(`${userURL}/careers`)
      .then((response) => {
        console.log(response);
        setJobs(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${adminbaseURL}/careers/jobs/delete/${id}`).then((res) => {
      let newList = jobs.filter((j) => j._id !== id);
      setJobs(newList);
    });
  }

  return (
    <div className="section-container min-h-screen container mx-auto py-12">
    {error ? (
      <div className="">no data</div>
    ) : (
      <>
      <JobsFeedAdmin updateJobs={updateJobs} />
        <h1 className="text-3xl font-bold my-12 capitalize">Hire someOne</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
               <div className="right-0 cursor-pointer w-7  h-7 hover:scale-90 transition-all duration-300 rounded-full bg-slate-500 text-white flex
               justify-center items-center"> <RiDeleteBinLine className="" onClick={() => handleDelete(job._id)}/> </div>
              <h2 className="text-lg font-semibold mb-2 ">
                <span>{job.title}</span>
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Place: <span>{job.location}</span>
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Education: <span>{job.education}</span>
              </p>
              <p className="text-sm mb-4">{job.description}</p>
              <Link
                to={`/admin/careers/${job._id}`}
                className="text-[#F26D1E] font-semibold hover:underline"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  
  );
}

export default CreateJobs;
