import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { userURL } from "../../Base/Constent";
import Error from "../error/Error";
import ApplyNow from "./ApplyNow";
import NoJobError from "../error/NoJobError";

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null); // State for error handling
  const [noJobs, setnoJobs] = useState(false); // State for error handling

  const location = useLocation();

  useEffect(() => {
    axios
      .get(`${userURL}/careers`)
      .then((response) => {
        // console.log(response);
        if(response.data){
          setJobs(response.data);
          setnoJobs(true)
        } else{
          setnoJobs(false)
        }
        
      })
      .catch((error) => {
        console.log(error);
        setError(error); // Set error state if request fails
      });
  }, []);
  

  return (
    <>
      <div className="section-container container mx-auto py-12">
    {jobs && jobs.length === 0 ? (
      <NoJobError />
    ) : (
      <>
        <h1 className="text-3xl font-bold my-12 capitalize">We are hiring: Join Our Team</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-2">
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
                to={`/careers/${job._id}`}
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

    </>
  
  
  );
}

export default Careers;
