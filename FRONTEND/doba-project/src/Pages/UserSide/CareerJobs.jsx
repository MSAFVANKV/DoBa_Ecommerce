import axios from "axios";
import React, { useEffect, useState } from "react";
import { userURL } from "../../Base/Constent";
import { useParams } from "react-router-dom";

function CareerJobs() {
  const { jobId } = useParams();
  const [jobsById, setJobsById] = useState([]);
  useEffect(() => {
    axios
      .get(`${userURL}/careers/${jobId}`)
      .then((response) => {
        
        console.log(response.data)
        setJobsById(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      {jobsById.map((job) => (<div className="">{job.title}</div>))}
    </div>
  );
}

export default CareerJobs;
